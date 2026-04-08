import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "../../Css/scrollBar.css";
import SummaryCardOfAllWorkers from "../SummaryCardOfAllWorkers/SummaryCardOfAllWorkers";

const PAGE_LIMIT = 50;

const TableForAllWorkers = ({
  axiosSecure,
  canImport,
  loadingImport,
  handleImportWorkers,
  message,
}) => {
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const parentRef = useRef(null);
  const searchInputRef = useRef(null);

  // selection toggle
  const toggleWorkerSelection = (workerId) => {
    setSelectedWorkers((prev) =>
      prev.includes(workerId)
        ? prev.filter((id) => id !== workerId)
        : [...prev, workerId]
    );
  };

  const clearSelection = () => {
    setSelectedWorkers([]);
  };

  // fetch workers
  const fetchWorkers = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      const currentPage = reset ? 1 : page;

      if (reset) {
        setSelectedWorkers([]);
        setPage(1);
        setHasMore(true);
      }

      setLoading(true);

      try {
        const res = await axiosSecure.get(
          `/api/getAllWorkersData?page=${currentPage}&limit=${PAGE_LIMIT}&search=${searchTerm}`
        );

        const newWorkers = res.data.workers || [];
        const totalWorkers = res.data.total || 0;

        setWorkers((prev) =>
          reset ? newWorkers : [...prev, ...newWorkers]
        );

        setTotal(totalWorkers);

        const loadedCount = reset
          ? newWorkers.length
          : workers.length + newWorkers.length;

        setHasMore(loadedCount < totalWorkers);
        setPage(currentPage + 1);
      } catch (err) {
        console.error("Fetch workers error:", err);
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure, page, loading, hasMore, searchTerm, workers.length]
  );

  // initial load
  useEffect(() => {
    fetchWorkers(true);
  }, []);

  // filtered workers
  const filteredWorkers = useMemo(() => {
    return workers.filter(
      (w) =>
        w.workerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [workers, searchTerm]);

  // virtualizer
  const rowVirtualizer = useVirtualizer({
    count: filteredWorkers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 52,
    overscan: 10,
  });

  // infinite scroll
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

    return () => el.removeEventListener("scroll", onScroll);
  }, [fetchWorkers, hasMore, loading]);

  // search
  const handleSearchClick = () => {
    fetchWorkers(true);
  };

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      fetchWorkers(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* top section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">All Workers</h2>
          <p className="text-gray-400 text-sm">
            Total Workers: {total}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            {canImport && (
              <button
                onClick={handleImportWorkers}
                disabled={loadingImport}
                className="px-4 py-2 rounded-lg bg-teal-800 text-white w-full sm:w-auto"
              >
                {loadingImport ? "Importing..." : "Import Workers"}
              </button>
            )}

            {message && (
              <p className="text-sm text-red-500 mt-1">{message}</p>
            )}
          </div>

          <button className="px-4 py-2 rounded-lg bg-indigo-700 text-white">
            Assign to Line / Order
          </button>
        </div>
      </div>

      {/* summary */}
      <SummaryCardOfAllWorkers />

      {/* search section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="relative w-full lg:w-1/2">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search by Worker ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKey}
            className="w-full p-3 pl-10 rounded-lg border outline-none"
          />

          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            size={20}
            onClick={handleSearchClick}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-white bg-pink-800">
            All Departments
          </button>
          <button className="px-4 py-2 rounded-lg text-white bg-sky-800">
            All Status
          </button>
        </div>
      </div>

      {/* table wrapper */}
      <div className="overflow-x-auto">
        {/* header */}
        <div className="grid grid-cols-7 min-w-[900px] gap-4 px-4 py-3 rounded-lg font-semibold text-sm border-b">
          <div>Select</div>
          <div>Worker ID</div>
          <div>Name</div>
          <div>Department</div>
          <div>Designation</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* list */}
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
                  className="grid grid-cols-7 min-w-[900px] gap-4 px-4 py-3 border-b items-center hover:bg-gray-800"
                >
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedWorkers.includes(worker?._id)}
                      onChange={() =>
                        toggleWorkerSelection(worker?._id)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                  </div>

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
                    <button className="px-3 py-1 rounded-lg text-sm hover:bg-blue-700">
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* footer */}
      {loading && (
        <p className="text-center text-gray-400">
          Loading more workers...
        </p>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500">
          All workers loaded ({total})
        </p>
      )}



      {/* bottom action bar */}
      <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl px-3 sm:px-4 lg:px-6 py-3 shadow-xl">
        <div className="flex flex-col gap-4">

          {/* top info section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <p className="text-sm font-medium text-white">
              {selectedWorkers.length} worker
              {selectedWorkers.length !== 1 ? "s" : ""} selected
            </p>

            <button
              onClick={clearSelection}
              disabled={selectedWorkers.length === 0}
              className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all duration-200 ${selectedWorkers.length === 0
                ? "bg-gray-600 cursor-not-allowed opacity-50"
                : "bg-gray-700 hover:bg-gray-600"
                }`}
            >
              Clear Selection
            </button>
          </div>

          {/* action groups */}
          <div className="flex  xl:flex-row justify-between gap-4 ">

            {/* HR actions */}
            <div className="border border-gray-700 rounded-xl p-3">
              <h3 className="text-sm font-semibold text-green-400 mb-2">
                HR Actions
              </h3>

              <div className="flex flex-wrap gap-2">
                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-green-500 opacity-50 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-600"
                    }`}
                >
                  Attendance
                </button>

                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-blue-500 opacity-50 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-600"
                    }`}
                >
                  Export
                </button>

                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-yellow-500 opacity-50 cursor-not-allowed"
                    : "bg-yellow-700 hover:bg-yellow-600"
                    }`}
                >
                  Transfer
                </button>

                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-purple-500 opacity-50 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-600"
                    }`}
                >
                  Payroll
                </button>
              </div>
            </div>

            {/* Production actions */}
            <div className="border border-gray-700 rounded-xl p-3">
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">
                Production Actions
              </h3>

              <div className="flex flex-wrap gap-2">
                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-indigo-500 opacity-50 cursor-not-allowed"
                    : "bg-indigo-700 hover:bg-indigo-600"
                    }`}
                >
                  Assign Line
                </button>

                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-pink-500 opacity-50 cursor-not-allowed"
                    : "bg-pink-700 hover:bg-pink-600"
                    }`}
                >
                  Assign Order
                </button>

                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-teal-500 opacity-50 cursor-not-allowed"
                    : "bg-teal-700 hover:bg-teal-600"
                    }`}
                >
                  Shift
                </button>

                <button
                  disabled={selectedWorkers.length === 0}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${selectedWorkers.length === 0
                    ? "bg-sky-600 opacity-50 cursor-not-allowed"
                    : "bg-sky-800 hover:bg-sky-600"
                    }`}
                >
                  Supervisor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default TableForAllWorkers;