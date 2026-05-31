import { useVirtualizer } from "@tanstack/react-virtual";
import { SpaceIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";



const WorkerListOfAllWorkerTable = ({ allWorkersData = [] }) => {
    //for detect current element---------
    const parentRef = useRef()
    // row virtualizer------------
    const rowVirtualizer = useVirtualizer({
        count: allWorkersData.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 55,
        overscan: 10
    })
 
    // for keep to top scrollAble div on -----------
    useEffect(() => {
        if (parentRef.current) {
            parentRef.current.scrollTop = 0
        }
    }, [allWorkersData])

    return (
        <div className="h-[600px] overflow-auto border-2 border-[#e5e7eb] rounded-[10px]" ref={parentRef}>
            <div style={{ width: '100%', position: "relative", height: `${rowVirtualizer.getTotalSize()}px` }}>
                {
                    rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const worker = allWorkersData[virtualRow.index]
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
                                        <input type="checkbox" />
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

        </div>
    );
};

export default WorkerListOfAllWorkerTable;