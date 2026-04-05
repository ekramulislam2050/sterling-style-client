import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_LIMIT = 50; // ✅  

const TableForAllWorkers = ({ axiosSecure }) => {
    const [workers, setWorkers] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [hasMore, setHasMore] = useState(true);
   
    const parentRef = useRef();

    // Fetch function
    const fetchWorkers = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await axiosSecure.get(`/api/getAllWorkersData?page=${page}&limit=${PAGE_LIMIT}`);
            const newWorkers = res.data.workers || [];
            setWorkers(prev => {
                const updatedWorkers = [...prev, ...newWorkers];
                if (updatedWorkers.length >= res.data.total) setHasMore(false);
                return updatedWorkers;
            });
            setTotal(res.data.total);
            setPage(prev => prev + 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure, page, loading, hasMore]);

    // Initial load
    useEffect(() => {
        fetchWorkers();
    }, []);

    const filteredWorkers = workers.filter(
        w =>
            w.workerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            w.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const rowVirtualizer = useVirtualizer({
        count: filteredWorkers.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        overscan: 10,
    });

    // Scroll event for infinite loading
    useEffect(() => {
        const el = parentRef.current;
        if (!el) return;

        const onScroll = () => {
            const scrollHeight = el.scrollHeight;
            const scrollTop = el.scrollTop;
            const clientHeight = el.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
                fetchWorkers();
            }
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [fetchWorkers, hasMore, loading]);

    return (
        <div>
            {/* length of total worker--------- */}
             <p className="text-[#ffffff] mb-2">Total Worker : {total}</p>
            <input
                type="text"
                placeholder="Search by worker ID or name"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded border mb-4"
            />

            <div ref={parentRef} className="border rounded-lg h-[600px] overflow-auto">
                <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
                    {rowVirtualizer.getVirtualItems().map(virtualRow => {
                        const worker = filteredWorkers[virtualRow.index];
                        return (
                            <div
                                key={worker?.workerId || virtualRow.index}
                                ref={virtualRow.measureRef}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: virtualRow.size,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                                className="py-2 border-b px-4"
                            >
                                {worker?.workerId} - {worker?.name}
                            </div>
                        );
                    })}
                </div>
            </div>

            {loading && <p className="text-center mt-2 text-gray-500">Loading more workers...</p>}
            {!hasMore && <p className="text-center mt-2 text-gray-500">All workers loaded ({total})</p>}
        </div>
    );
};

export default TableForAllWorkers;