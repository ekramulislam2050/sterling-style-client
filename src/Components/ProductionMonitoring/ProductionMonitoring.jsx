
import LineWiseProduction from '../LineWiseProduction/LineWiseProduction';
import HourlyProductionChart from '../HourlyProductionChart/HourlyProductionChart';
import DelayReasons from '../DelayReasons/DelayReasons';
 


const ProductionMonitoring = () => {
    

    return (
        <div className="grid lg:grid-cols-3  gap-3 md:grid-cols-2   px-1">
           <div className=' h-[280px] w-full   overflow-hidden  rounded-xl '>
            <HourlyProductionChart></HourlyProductionChart>
           </div>
            <div className=' h-[280px] w-full   overflow-hidden'>
                <LineWiseProduction></LineWiseProduction>
            </div>
            <div className=' h-[280px] w-full   overflow-hidden'> 
                 <DelayReasons></DelayReasons>
            </div>
        </div>
    );
};

export default ProductionMonitoring;