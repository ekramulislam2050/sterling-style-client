import { useEffect, useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const WorkerListOfAllWorkerTable = ({
    filteredWorkers,
    selectedWorkers,
    setSelectedWorkers,
    hasMore,
    loading,
    fetchWorkers,
}) => {
    const parentRef = useRef(null);

    // Toggle worker selection---------------
    const toggleWorkerSelection = (workerId) => {
        setSelectedWorkers((prev) =>
            prev.includes(workerId)
                ? prev.filter((id) => id !== workerId)
                : [...prev, workerId]
        );
    };

 const rowVirtualizer = useVirtualizer({
        count: filteredWorkers.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 52,
        overscan: 10,
    });

    // scrolling-------------------
    useEffect(() => {
        const el = parentRef.current;
        if (!el) return;

        const onScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = el;

            if (
                scrollTop + clientHeight >= scrollHeight - 50 &&
                hasMore &&
                !loading
            ) {
                fetchWorkers();
            }
        };

        el.addEventListener("scroll", onScroll);

        return () => {
            el.removeEventListener("scroll", onScroll);
        };
    }, [fetchWorkers, hasMore, loading]);

    return (
        <div
            ref={parentRef}
            className="border rounded-lg h-[600px] overflow-auto custom-scrollbar"
        >
            <div
                style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: "relative",
                    minWidth: "900px",
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const worker = filteredWorkers[virtualRow.index];

                    if (!worker) return null;

                    return (
                        <div
                            key={worker._id}
                            ref={virtualRow.measureRef}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: virtualRow.size,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                            className="grid grid-cols-7 min-w-[900px] gap-4 px-4 py-3 border-b items-center hover:bg-gray-800"
                        >
                            <div>
                                <input
                                    type="checkbox"
                                    checked={selectedWorkers.includes(worker._id)}
                                    onChange={() =>
                                        toggleWorkerSelection(worker._id)
                                    }
                                    className="w-4 h-4 cursor-pointer"
                                />
                            </div>

                            <div>{worker.workerId}</div>
                            <div>{worker.name}</div>
                            <div>{worker.department}</div>
                            <div>{worker.designation}</div>

                            <div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${worker.status === "Active"
                                        ? "bg-green-100 text-green-700"
                                        : worker.status === "On Leave"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : worker.status === "Resigned"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {worker.status}
                                </span>
                            </div>

                            <div>
                                <button className="px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
                                    View
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkerListOfAllWorkerTable;