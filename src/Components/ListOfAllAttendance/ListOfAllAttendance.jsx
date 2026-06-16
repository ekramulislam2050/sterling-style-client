import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import Skeleton from "../../LoadingAndSuccessAndErrMsg/Skeleton/Skeleton";
import AttendanceSummaryCards from "../AttendanceSummaryCard/AttendanceSummaryCard";

const ListOfAllAttendance = ({ attendance = [], loading }) => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: attendance.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
    overscan: 10,
  });

  useEffect(() => {
    if (!loading && attendance.length > 0) {
      rowVirtualizer.scrollToIndex(0);
    }
  }, [attendance.length, loading, rowVirtualizer]);

  return (
    <div className="pt-30">
       <h1 className="ml-2 mb-1 text-4xl font-semibold">Attendance</h1>
      <AttendanceSummaryCards attendance={attendance}></AttendanceSummaryCards>
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
          ref={parentRef}
          className="h-[650px] overflow-auto  "
        >
          {
            loading ?
              <Skeleton></Skeleton>
              :

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
                        {row.workerId}
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
          }
        </div>
      </div>
    </div>
  );
};

export default ListOfAllAttendance;