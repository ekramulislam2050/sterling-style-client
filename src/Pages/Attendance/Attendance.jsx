import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";

const PAGE_SIZE = 50;

const Attendance = () => {
    const axiosSecure = useAxiosSecure();
    const parentRef = useRef();

    // 🔥 infinite query
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
        getNextPageParam: (lastPage) => {
            return lastPage.page < lastPage.totalPages
                ? lastPage.page + 1
                : undefined;
        },
    });

    // 🔥 flatten data
    const items = data?.pages.flatMap((p) => p.data) || [];

    // 🔥 virtualizer
    const virtualizer = useVirtualizer({
        count: hasNextPage ? items.length + 1 : items.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60,
        overscan: 10,
    });

    // 🔥 load more on scroll end
    const virtualItems = virtualizer.getVirtualItems();

    const lastItem = virtualItems[virtualItems.length - 1];

    if (lastItem?.index >= items.length - 1 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
    }

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading data</p>;

    return (
        <div>
            <h1>Attendance</h1>

            {/* scroll container */}
            <div
                ref={parentRef}
                style={{
                    height: "500px",
                    overflow: "auto",
                }}
            >
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        position: "relative",
                    }}
                >
                    {virtualItems.map((virtualRow) => {
                        const isLoaderRow = virtualRow.index >= items.length;

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
                                className="border-b p-2"
                            >
                                {isLoaderRow ? (
                                    <p>Loading more...</p>
                                ) : (
                                    <>
                                        <p>{item.workerId}</p>
                                        <p>{item.status}</p>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Attendance;