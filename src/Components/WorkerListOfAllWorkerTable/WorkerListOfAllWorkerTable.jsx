import { useVirtualizer } from "@tanstack/react-virtual";
import { SpaceIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";



const WorkerListOfAllWorkerTable = ({ workers = [], selectedWorkers, setSelectedWorkers, loading, setPage }) => {

    // handle selected worker----------
    const handleSelectedWorker = (_id) => {
        setSelectedWorkers((prev) => {

            const exist = prev.includes(_id)

            if (exist) {
                return prev.filter((id) => id !== _id)
            }
            return [...prev, _id]
        })
    }

    //for detect current element---------
    const parentRef = useRef()
    // row virtualizer------------
    const rowVirtualizer = useVirtualizer({
        count: workers.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 55,
        overscan: 10
    })

    // update page.................
    const virtualRows = rowVirtualizer.getVirtualItems()
    useEffect(() => {
        const lastRow = virtualRows[virtualRows.length - 1]
        if (!lastRow) return;
        if (lastRow.index >= workers.length - 5 && !loading) {
            setPage((prev) => prev + 1)
        }

    }, [virtualRows, workers.length, loading])

    return (
        <div className="h-[600px] overflow-auto border-2 border-[#e5e7eb] rounded-[10px]" ref={parentRef}>

            <div style={{ width: '100%', position: "relative", height: `${rowVirtualizer.getTotalSize()}px` }}>
                {
                    rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const worker = workers[virtualRow.index]
                        return (
                            <div key={worker?._id || virtualRow.index}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`

                                }}>
                                <div className="grid grid-cols-7
                                                min-w-[900px]
                                                gap-4
                                                px-4 py-3
                                                border-b
                                                items-center
                                                text-sm
                                                hover:bg-cyan-900/90">

                                    <div>
                                        <input type="checkbox"
                                         checked={selectedWorkers.includes(worker?._id)}
                                            onChange={() => handleSelectedWorker(worker?._id)}
                                        />
                                    </div>

                                    <div>
                                        <span className="text-red-500 pr-1 font-bold text-lg">
                                            {`${virtualRow.index + 1}.`}
                                        </span>
                                        <span>
                                            {worker?.workerId}
                                        </span>

                                    </div>

                                    <div>
                                        {worker?.name}
                                    </div>

                                    <div>
                                        {worker?.department}
                                    </div>

                                    <div>
                                        {worker?.designation}
                                    </div>

                                    <div>
                                        {worker?.status}
                                    </div>

                                    <div>
                                        <Link to={`/WorkerDetails/${worker?._id}`} className="  py-1 px-2 rounded-lg bg-cyan-800">
                                            View
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

            {loading && (
                <div className="text-center py-5">
                    Loading...
                </div>
            )}
        </div>
    );
};

export default WorkerListOfAllWorkerTable;