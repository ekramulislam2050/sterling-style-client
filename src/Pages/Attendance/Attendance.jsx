import { useEffect, useRef, useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

import SearchAndFilterOfWorkerAttendance from "../../Components/SearchAndFilterOfWorkerAttendance/SearchAndFilterOfWorkerAttendance";
import HeaderOfAttendancePage from "../../Components/HeaderOfAttendancePage/HeaderOfAttendancePage";
import SummaryCardsOfAttendance from "../../Components/SummaryCardsOfAttendance/SummaryCardsOfAttendance";
import TableOfAttendance from "../../Components/TableOfAttendance/TableOfAttendance";

const PAGE_SIZE = 50;

const Attendance = () => {
    const axiosSecure = useAxiosSecure();
    const parentRef = useRef();
    const [debouncedFilter, setDebouncedFilter] = useState({
        search: "",
        status: "all",
        date: "",
        fromDate: "",
        toDate: ""
    })
    const [filter, setFilter] = useState({
        search: "",
        status: "all",
        date: "",
        fromDate: "",
        toDate: ""
    });

    console.log("filter ===", filter)

    // =========================
    // debounce
    // =========================
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilter(filter)
        }, 500)
        return () => clearTimeout(timer)
    }, [filter])

    // =========================
    // QUERY (FIXED)
    // =========================
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [
            "attendance",
            debouncedFilter
        ],

        queryFn: async ({ pageParam = 1 }) => {
            const res = await axiosSecure.get(`/api/getAttendanceOfWorker`, {
                params: {
                    page: pageParam,
                    limit: PAGE_SIZE,
                    ...(debouncedFilter.search && { workerId: debouncedFilter.search }),
                    ...(debouncedFilter.status !== "all" && { status: debouncedFilter.status }),
                    ...(debouncedFilter.date && { date: debouncedFilter.date }),
                    ...(debouncedFilter.fromDate && { fromDate: debouncedFilter.fromDate }),
                    ...(debouncedFilter.toDate && { toDate: debouncedFilter.toDate }),
                }
            });

            return res.data;
        },
        keepPreviousData: true,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined,
    });
    // =========================
    // FLATTEN DATA
    // =========================
    const items = useMemo(
        () => data?.pages?.flatMap((p) => p.data) || [],
        [data]
    );

    // =========================
    // VIRTUALIZER
    // =========================
    const virtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60,
        overscan: 10,
    });

    const virtualItems = virtualizer.getVirtualItems();

    // =========================
    // INFINITE SCROLL
    // =========================
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
    }, [virtualItems, hasNextPage, isFetchingNextPage]);

    // =========================
    // RESET SCROLL ON FILTER
    // =========================
    useEffect(() => {
        // parentRef.current?.scrollTo(0, 0);
        // virtualizer.scrollToIndex(0);
    }, []);



    // =========================
    // LOADING / ERROR
    // =========================
    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4 text-red-500">Error loading data</p>;

    return (
        <div className="pt-28 px-4 space-y-4">

            <HeaderOfAttendancePage data={data} />

            <SummaryCardsOfAttendance items={items} />

            <SearchAndFilterOfWorkerAttendance
                setFilter={setFilter}
                filter={filter}
            />

            <TableOfAttendance
                isFetchingNextPage={isFetchingNextPage}
                parentRef={parentRef}
                virtualizer={virtualizer}
                virtualItems={virtualItems}
                items={items}
            />
        </div>
    );
};

export default Attendance;