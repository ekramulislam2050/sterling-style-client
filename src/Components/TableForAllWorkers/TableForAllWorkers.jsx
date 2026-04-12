import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "../../Css/scrollBar.css";
import SummaryCardOfAllWorkers from "../SummaryCardOfAllWorkers/SummaryCardOfAllWorkers";
import HrAndProductionsActionButtons from "../HrAndProductionsActionButtons/HrAndProductionsActionButtons";
import HeaderOfAllWorkersTable from "../HeaderOfAllWorkersTable/HeaderOfAllWorkersTable";
import WorkerListOfAllWorkerTable from "../WorkerListOfAllWorkerTable/WorkerListOfAllWorkerTable";
import SearchAndFilterButtonsOfAllWorkerTable from "../SearchAndFilterButtonsOfAllWorkerTable/SearchAndFilterButtonsOfAllWorkerTable";

import FooterOfAllWorkerTable from "../FooterOfAllWorkerTable/FooterOfAllWorkerTable";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";

const PAGE_LIMIT = 50;

const TableForAllWorkers = () => {
  const axiosSecure = useAxiosSecure()
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

      {/* summary------------------------------ */}
      <SummaryCardOfAllWorkers
        workers={workers}
        total={total}
      />

      {/* search section------------------------*/}
      <SearchAndFilterButtonsOfAllWorkerTable
        searchInputRef={searchInputRef}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearchKey={handleSearchKey}
        handleSearchClick={handleSearchClick}
      />

      {/* table wrapper-------------------------*/}
      <div className="overflow-x-auto">
        {/* header----------------------------- */}
        <HeaderOfAllWorkersTable></HeaderOfAllWorkersTable>

        {/* list--------------------------------*/}
        <WorkerListOfAllWorkerTable
          parentRef={parentRef}
          rowVirtualizer={rowVirtualizer}
          filteredWorkers={filteredWorkers}
          selectedWorkers={selectedWorkers}
          toggleWorkerSelection={toggleWorkerSelection}
        ></WorkerListOfAllWorkerTable>
      </div>

      {/* footer--------------------------------*/}
      <FooterOfAllWorkerTable
        loading={loading}
        hasMore={hasMore}
        total={total}
      ></FooterOfAllWorkerTable>



      {/* bottom action bar-----------------------*/}
      <HrAndProductionsActionButtons
        selectedWorkers={selectedWorkers}
        clearSelection={clearSelection}
      ></HrAndProductionsActionButtons>


    </div>
  );
};

export default TableForAllWorkers;