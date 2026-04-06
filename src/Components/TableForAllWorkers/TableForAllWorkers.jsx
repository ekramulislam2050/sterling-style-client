import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../../Css/scrollBar.css"

const PAGE_LIMIT = 50;

const TableForAllWorkers = ({ axiosSecure }) => {
  const [workers, setWorkers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const parentRef = useRef();
  const searchInputRef = useRef();

  // Fetch function (API call)
  const fetchWorkers = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;
      setLoading(true);

      try {
        const res = await axiosSecure.get(
          `/api/getAllWorkersData?page=${reset ? 1 : page}&limit=${PAGE_LIMIT}&search=${searchTerm}`
        );
        const newWorkers = res.data.workers || [];

        setWorkers(prev => (reset ? newWorkers : [...prev, ...newWorkers]));
        setTotal(res.data.total);
        setHasMore(newWorkers.length + (reset ? 0 : workers.length) < res.data.total);
        setPage(prev => (reset ? 2 : prev + 1));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure, page, loading, hasMore, searchTerm, workers.length]
  );



  // Initial load
  useEffect(() => {
    fetchWorkers(true);
  }, []);

  // Filtered workers (client-side, optional)
  const filteredWorkers = workers.filter(
    w =>
      w.workerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Virtualizer
  const rowVirtualizer = useVirtualizer({
    count: filteredWorkers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10
  });

  // Infinite scroll
  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = el;
      if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
        fetchWorkers();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [fetchWorkers, hasMore, loading]);

  // Search actions
  const handleSearchClick = () => fetchWorkers(true); // icon click
  const handleSearchKey = e => {
    if (e.key === "Enter") fetchWorkers(true); // Enter key
  };

  return (
    <div>
      {/* Total worker count */}
      <p className="text-[#ffffff] mb-2">Total Worker: {total}</p>

      {/* Search input */}
      <div className="relative mb-4 w-full">

        <input
          type="text"
          ref={searchInputRef}
          placeholder="Search by worker ID or name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKey}
          onPaste={e => {
            e.preventDefault(); // default paste রোধ
            const paste = e.clipboardData.getData("text").trim(); // trim করে paste
            const { selectionStart, selectionEnd } = e.target;

            // cursor এর আগে ও পরে যা আছে তার সাথে paste merge করা
            const newValue =
              searchTerm.slice(0, selectionStart) +
              paste +
              searchTerm.slice(selectionEnd);

            setSearchTerm(newValue);

            // cursor position paste শেষে set করা
            setTimeout(() => {
              e.target.selectionStart = e.target.selectionEnd = selectionStart + paste.length;
            }, 0);
          }}
          className="w-full p-3 pl-10 rounded border"
        />
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-700 transition"
          size={20}
          onClick={handleSearchClick}
        />
      </div>

      {/* Virtualized list with custom scroll bar */}
      <div
        ref={parentRef}
        className="border rounded-lg h-[600px] overflow-auto custom-scrollbar"
      >
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
                  transform: `translateY(${virtualRow.start}px)`
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