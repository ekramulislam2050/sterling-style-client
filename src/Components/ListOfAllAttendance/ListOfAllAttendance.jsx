import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import AttendanceSummaryCards from "../AttendanceSummaryCard/AttendanceSummaryCard";
import TableSkeleton from "../../LoadingAndSuccessAndErrMsg/TableSkeleton/TableSkeleton";
import SearchAndFilterOfAttendance from "../SearchAndFilterOfAttendance/SearchAndFilterOfAttendance";

const ListOfAllAttendance = ({
  attendance = [],
  loading,
  containerRef,
  handleScroll,
  handleSearch,
  handleStatus,
  handleDate,
  handleReset,
  search,
  status,
  date,
  searchTxt,

}) => {


  const rowVirtualizer = useVirtualizer({
    count: attendance.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 55,
    overscan: 10,
  });


  return (
    <div className="pt-30">
      <h1 className="ml-2 mb-1 text-4xl font-semibold">Attendance</h1>

      {/* attendance summary card------------------ */}
      <AttendanceSummaryCards attendance={attendance}></AttendanceSummaryCards>

      {/* attendance search and filtering--------------------- */}
      <SearchAndFilterOfAttendance
        handleSearch={handleSearch}
        handleDate={handleDate}
        handleStatus={handleStatus}
        handleReset={handleReset}
        search={search}
        status={status}
        date={date}
        searchTxt={searchTxt}

      ></SearchAndFilterOfAttendance>

      <div className="w-full rounded-lg border shadow-sm   ">
        {/* Table Header */}
        <div className="grid grid-cols-6 bg-teal-600   text-white font-semibold sticky top-0 z-10">
          <div className="p-3">Worker ID</div>
          <div className="p-3">Name</div>
          <div className="p-3">Date</div>
          <div className="p-3">Check In</div>
          <div className="p-3">Check Out</div>
          <div className="p-3">Status</div>
        </div>

        {/* Virtualized Body */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-[650px] overflow-auto  "
        >
          {
            loading && attendance.length === 0 ? (
              <TableSkeleton></TableSkeleton>
            ) :

              <>

                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    position: "relative",
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const row = attendance[virtualRow.index];

                    return (
                      <div
                        key={row._id}
                        className={`grid grid-cols-6 items-center border-b px-2 ${virtualRow.index % 2 === 0
                          ? "bg-teal-800"
                          : "bg-teal-900"
                          }`}
                        style={{
                          height: `${virtualRow.size}px`,
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                      >

                        <div className="p-2 font-medium">
                          <span className="text-red-500 font-bold"> {virtualRow.index + 1} . </span>{row.workerId}
                        </div>

                        <div className="p-2">
                          {row.name}
                        </div>

                        <div className="p-2">
                          {row.date}
                        </div>

                        <div className="p-2">
                          {row.checkIn || "--"}
                        </div>

                        <div className="p-2">
                          {row.checkOut || "--"}
                        </div>

                        <div className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${row.status === "present"
                              ? "bg-green-100 text-green-700"
                              : row.status === "late"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                              }`}
                          >
                            {row.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* infinite scroll loading--------- */}
                {
                  loading && attendance.length > 0 && (
                    <div className="flex justify-center items-center py-4">
                      <span className="loading loading-spinner loading-lg text-teal-600"></span>
                    </div>
                  )
                }
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default ListOfAllAttendance;