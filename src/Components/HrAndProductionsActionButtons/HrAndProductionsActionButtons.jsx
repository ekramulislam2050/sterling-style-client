import HrActionButtons from "../HrActionButtons/HrActionButtons";
import ProductionActionButtons from "../ProductionActionButtons/ProductionActionButtons";


const HrAndProductionsActionButtons = ({selectedWorkers,setSelectedWorkers}) => {
    
    // clear selected worker-----------
     const clearSelection = () => {
        setSelectedWorkers([]);
      };
    
    return (
        <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-2xl px-3 sm:px-4 lg:px-6 py-3 shadow-xl mt-10">
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
                     <HrActionButtons _idsOfSelectedWorkers={selectedWorkers}></HrActionButtons>

                    {/* Production actions */}
                        <ProductionActionButtons selectedWorkers={selectedWorkers}></ProductionActionButtons>
                </div>
            </div>
        </div>
    );
};

export default HrAndProductionsActionButtons;