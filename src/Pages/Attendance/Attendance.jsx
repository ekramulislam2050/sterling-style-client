import { useEffect, useRef, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import "../../Css/rotateBorder.css"
const PAGE_SIZE = 50;

const Attendance = () => {
    const axiosSecure = useAxiosSecure();
    const parentRef = useRef();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["attendance"],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosSecure.get(
                `/api/getAttendanceOfWorker?page=${pageParam}&limit=${PAGE_SIZE}`
            );
            return res.data;
        },
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined,
    });

    const items = useMemo(
        () => data?.pages?.flatMap((p) => p.data) || [],
        [data]
    );

    console.log("data", data)
    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60,
        overscan: 10,
    });

    const virtualItems = virtualizer.getVirtualItems();

    useEffect(() => {
        const last = virtualItems.at(-1);

        if (
            last &&
            last.index >= items.length - 5 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    }, [virtualItems, items.length, hasNextPage, isFetchingNextPage]);

    if (isLoading) return <p className="p-4">Loading...........</p>;
    if (isError) return <p className="p-4 text-red-500">Error loading data</p>;

    // =========================
    // 🎨 STATUS COLOR FUNCTION
    // =========================
    const getStatusStyle = (status) => {
        switch (status) {
            case "present":
                return "bg-green-300 text-green-800 border border-green-300";

            case "absent":
                return "bg-red-300 text-red-800 border border-red-300";

            case "late":
                return "bg-yellow-200 text-yellow-800 border border-yellow-300";

            case "leave":
                return "bg-blue-300 text-blue-800 border border-blue-300";

            default:
                return "bg-gray-200 text-gray-800 border border-gray-300";
        }
    };

    return (
        <div className="pt-28 px-4 space-y-4">

            {/* =========================
                📊 HEADER
            ========================= */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
                <div>
                    {
                        data.pages?.map((pages, idx) => <div key={idx} className="relative">
                            <div className="px-2 py-1">
                                <span className="text-blue-300 font-semibold">Page : {pages.page}</span>
                                <span className="text-green-300 mx-1 font-semibold">
                                    <span className="pr-1 text-xl text-yellow-300">&#8594;</span>
                                    Records : {pages.data.length}
                                    <span className="pl-1 text-xl text-yellow-300">&#8594;</span>
                                </span>
                                <span className="text-red-400 font-semibold"> Total : {pages.total} </span>
                            </div>
                            {/* Rotating Border----------------- */}
                            <span className="absolute inset-0 rounded-xl border-2 border-cyan-400 
        animate-rotate-border"></span>

                        </div>)
                    }
                </div>

            </div>

            {/* =========================
                📊 SUMMARY CARDS
            ========================= */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-green-700 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Present</p>
                    <p className="text-xl font-bold text-green-100">
                        {items.filter(i => i.status?.toLowerCase() === "present").length}
                    </p>
                </div>

                <div className="p-3 bg-red-700 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Absent</p>
                    <p className="text-xl font-bold text-red-100">
                        {items.filter(i => i.status?.toLowerCase() === "absent").length}
                    </p>
                </div>

                <div className="p-3 bg-yellow-700 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Late</p>
                    <p className="text-xl font-bold text-yellow-100">
                        {items.filter(i => i.status?.toLowerCase() === "late").length}
                    </p>
                </div>

                <div className="p-3 bg-blue-800 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-100">Leave</p>
                    <p className="text-xl font-bold text-blue-100">
                        {items.filter(i => i.status?.toLowerCase === "leave").length}
                    </p>
                </div>
            </div>

            {/* =========================
                📋 TABLE HEADER
            ========================= */}
            <div className="grid grid-cols-4 p-3 rounded-md font-semibold text-sm">
                <span>Worker ID</span>
                <span>In Time</span>
                <span>Status</span>
                <span>Out Time</span>
            </div>

            {/* =========================
                📜 VIRTUAL LIST
            ========================= */}
            <div
                ref={parentRef}
                className="h-[500px] overflow-auto border rounded-md custom-scrollbar"
            >
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        position: "relative",
                    }}
                >
                    {virtualItems.map((virtualRow) => {
                        const item = items[virtualRow.index];

                        return (
                            <div
                                key={virtualRow.key}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                                className="grid grid-cols-4 px-3 py-2 border-b hover:bg-gray-700 text-sm items-center"
                            >
                                <span className="font-medium">
                                    {item.workerId}
                                </span>

                                <span>{item.inTime || "-"}</span>

                                <span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>
                                </span>

                                <span>{item.outTime || "-"}</span>
                            </div>
                        );
                    })}
                </div>

                {/* LOADING MORE */}
                {isFetchingNextPage && (
                    <div className="p-2 text-center text-gray-500 text-sm">
                        Loading more attendance...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;