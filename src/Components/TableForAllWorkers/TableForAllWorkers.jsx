import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../../Css/scrollBar.css"
import SummaryCardOfAllWorkers from "../SummaryCardOfAllWorkers/SummaryCardOfAllWorkers";

const PAGE_LIMIT = 50;

const TableForAllWorkers = ({ axiosSecure, canImport, loadingImport, handleImportWorkers, message }) => {
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
    <div className="space-y-4">
      {/* Top section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">All Workers</h2>
          <p className="text-gray-400 text-sm">
            Total Workers: {total}
          </p>
        </div>
        <div className="space-x-2 flex">
          <div>
            {/* Import button */}
            {canImport && (
              <button
                onClick={handleImportWorkers}
                disabled={loadingImport}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                {loadingImport ? "Importing..." : "Import Workers"}
              </button>
            )}

            {/* Status message */}
            {message && (
              <p className=" text-sm text-red-500 flex ">{message}</p>
            )}
          </div>

          {/* assign to btn--------- */}
          <div>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">
              Assign to Line / Order
            </button>
          </div>
        </div>
      </div>

      {/* summary card--------------- */}
      <SummaryCardOfAllWorkers></SummaryCardOfAllWorkers>

      {/* Search */}
      <div className="relative w-full">
        <input
          type="text"
          ref={searchInputRef}
          placeholder="Search by Worker ID or Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKey}
          onPaste={(e) => {
            e.preventDefault();
            const paste = e.clipboardData.getData("text").trim();
            const { selectionStart, selectionEnd } = e.target;

            const newValue =
              searchTerm.slice(0, selectionStart) +
              paste +
              searchTerm.slice(selectionEnd);

            setSearchTerm(newValue);

            setTimeout(() => {
              e.target.selectionStart =
                e.target.selectionEnd =
                selectionStart + paste.length;
            }, 0);
          }}
          className="w-full p-3 pl-10 rounded-lg border outline-none"
        />

        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          size={20}
          onClick={handleSearchClick}
        />
      </div>

      {/* Table header */}
      <div className="grid grid-cols-6 gap-4 px-4 py-3   rounded-lg font-semibold text-sm">
        <div>Worker ID</div>
        <div>Name</div>
        <div>Department</div>
        <div>Designation</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {/* Virtualized list */}
      <div
        ref={parentRef}
        className="border rounded-lg h-[600px] overflow-auto custom-scrollbar"
      >
        <div
          style={{
            height: rowVirtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const worker = filteredWorkers[virtualRow.index];

            return (
              <div
                key={worker?._id || virtualRow.index}
                ref={virtualRow.measureRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-6 gap-4 px-4 py-3 border-b items-center  hover:bg-gray-800"
              >
                <div>{worker?.workerId}</div>
                <div>{worker?.name}</div>
                <div>{worker?.department}</div>
                <div>{worker?.designation}</div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${worker?.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : worker?.status === "On Leave"
                        ? "bg-yellow-100 text-yellow-700"
                        : worker?.status === "Resigned"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {worker?.status}
                  </span>
                </div>

                <div>
                  <button className="px-3 py-1  rounded-lg text-sm hover:bg-blue-700">
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading more workers...
        </p>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500">
          All workers loaded ({total})
        </p>
      )}
    </div>
  );
};

export default TableForAllWorkers;