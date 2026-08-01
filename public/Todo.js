// to do add Designation with user name will.

// 1.updateOrderForm কম্পোনেন্টে user এর role base কাজ বাকি আছে

// 2.backend এ posts .route এ autoGenerateTNA   function এর ভেতর addDays ()এর ভেতর auto যে দিন গুলো add করা হচ্ছে সে গুলো নিয়ে গবেষণা করতে হবে। দিন গুলো auto যোগ হবে ,কি না ?

// qty ,date db তে string হিসাবে যাচ্ছে এটা number এ কনভার্ট করতে হবে 

// প্ৰত্যেকটা component ,page এর error message গুলো modify করতে হবে, বিশেষ করে নিজে  message তৈরি করে error এর সাথে add করতে হবে, যেখানে কোন পেজ/কম্পোনেন্ট থেকে সেই   error তৈরি হচ্ছে তা উল্লেখ থাকবে। 

import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import HeaderOfAllWorkersTable from "../HeaderOfAllWorkersTable/HeaderOfAllWorkersTable";
import WorkerListOfAllWorkerTable from "../WorkerListOfAllWorkerTable/WorkerListOfAllWorkerTable";
import FooterOfAllWorkerTable from "../FooterOfAllWorkerTable/FooterOfAllWorkerTable";
import HrAndProductionsActionButtons from "../HrAndProductionsActionButtons/HrAndProductionsActionButtons";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";

const LIMIT = 50;

const TableForAllWorkers = () => {
    const axiosSecure = useAxiosSecure();

    const [workers, setWorkers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const [selectedWorkers, setSelectedWorkers] = useState([]);

    const fetchWorkers = async (pageNumber) => {
        try {
            setLoading(true);

            const res = await axiosSecure.get(
                `/api/getAllWorkersData?page=${pageNumber}&limit=${LIMIT}`
            );

            const newWorkers = res.data.workers || [];

            setWorkers((prev) =>
                pageNumber === 1
                    ? newWorkers
                    : [...prev, ...newWorkers]
            );

            setHasMore(newWorkers.length === LIMIT);
        } catch (err) {
            console.log(err);
            ErrMsg("Failed to load workers");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkers(page);
    }, [page]);

    return (
        <div className="space-y-4 mt-2">

            <div className="overflow-x-auto">

                <HeaderOfAllWorkersTable />

                <WorkerListOfAllWorkerTable
                    workers={workers}
                    loading={loading}
                    hasMore={hasMore}
                    setPage={setPage}
                    selectedWorkers={selectedWorkers}
                    setSelectedWorkers={setSelectedWorkers}
                />

            </div>

            <FooterOfAllWorkerTable
                loading={loading}
                allWorkersData={workers}
            />

            <HrAndProductionsActionButtons
                selectedWorkers={selectedWorkers}
                setSelectedWorkers={setSelectedWorkers}
            />

        </div>
    );
};

export default TableForAllWorkers;
// -------------------------------------------------

import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const WorkerListOfAllWorkerTable = ({
    workers,
    loading,
    hasMore,
    setPage,
    selectedWorkers,
    setSelectedWorkers,
}) => {

    const parentRef = useRef(null);

    const rowVirtualizer = useVirtualizer({
        count: workers.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 55,
        overscan: 10,
    });

    const virtualRows = rowVirtualizer.getVirtualItems();

    useEffect(() => {
        const lastRow = virtualRows[virtualRows.length - 1];

        if (!lastRow) return;

        if (
            lastRow.index >= workers.length - 5 &&
            hasMore &&
            !loading
        ) {
            setPage((prev) => prev + 1);
        }

    }, [virtualRows, workers.length, hasMore, loading]);

    const handleSelectedWorker = (_id) => {

        setSelectedWorkers((prev) => {

            if (prev.includes(_id)) {
                return prev.filter((id) => id !== _id);
            }

            return [...prev, _id];

        });

    };

    return (
        <div
            ref={parentRef}
            className="h-[600px] overflow-auto border rounded-lg"
        >

            <div
                style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: "relative",
                }}
            >

                {virtualRows.map((virtualRow) => {

                    const worker = workers[virtualRow.index];

                    return (
                        <div
                            key={worker._id}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: virtualRow.size,
                                transform: `translateY(${virtualRow.start}px)`,
                            }}
                        >

                            <div
                                className="grid grid-cols-7 min-w-[900px] gap-4 px-4 py-3 border-b hover:bg-cyan-900/80"
                            >

                                <input
                                    type="checkbox"
                                    checked={selectedWorkers.includes(worker._id)}
                                    onChange={() =>
                                        handleSelectedWorker(worker._id)
                                    }
                                />

                                <div>
                                    {virtualRow.index + 1}. {worker.workerId}
                                </div>

                                <div>{worker.name}</div>

                                <div>{worker.department}</div>

                                <div>{worker.designation}</div>

                                <div>{worker.status}</div>

                                <Link
                                    to={`/WorkerDetails/${worker._id}`}
                                    className="bg-cyan-700 rounded px-2 py-1"
                                >
                                    View
                                </Link>

                            </div>

                        </div>
                    );

                })}

            </div>

            {loading && (
                <div className="text-center py-4">
                    Loading...
                </div>
            )}

        </div>
    );
};

export default WorkerListOfAllWorkerTable;