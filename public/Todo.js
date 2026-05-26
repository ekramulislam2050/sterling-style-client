// to do add Designation with user name will.

// 1.updateOrderForm কম্পোনেন্টে user এর role base কাজ বাকি আছে

// 2.backend এ posts .route এ autoGenerateTNA   function এর ভেতর addDays ()এর ভেতর auto যে দিন গুলো add করা হচ্ছে সে গুলো নিয়ে গবেষণা করতে হবে। দিন গুলো auto যোগ হবে ,কি না ?

// qty ,date db তে string হিসাবে যাচ্ছে এটা number এ কনভার্ট করতে হবে 

// প্ৰত্যেকটা component ,page এর error message গুলো modify করতে হবে, বিশেষ করে নিজে  message তৈরি করে error এর সাথে add করতে হবে, যেখানে কোন পেজ/কম্পোনেন্ট থেকে সেই   error তৈরি হচ্ছে তা উল্লেখ থাকবে। 




import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const WorkerListOfAllWorkerTable = ({
  allWorkersData = [],
}) => {

  // parent scroll container
  const parentRef = useRef(null);

  // virtualizer
  const rowVirtualizer = useVirtualizer({
    count: allWorkersData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
    overscan: 10,
  });
     
  // optional scroll top on data change
  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
    }
  }, [allWorkersData]);

  

  return (
    <div
      ref={parentRef}
      style={{
        height: "600px",
        overflow: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const worker =
            allWorkersData[virtualRow.index];

          return (
            <div
              key={worker?._id || virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                borderBottom: "1px solid #f1f5f9",
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                background: "white",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "120px 1fr 160px 160px",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <p>{worker?.workerId}</p>

                <p>{worker?.name}</p>

                <p>{worker?.department}</p>

                <p>{worker?.line}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkerListOfAllWorkerTable;