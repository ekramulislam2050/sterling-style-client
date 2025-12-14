
import LineWiseProduction from '../LineWiseProduction/LineWiseProduction';
import HourlyProductionChart from '../HourlyProductionChart/HourlyProductionChart';
import DelayReasons from '../DelayReasons/DelayReasons';
 


const ProductionMonitoring = () => {
    

    return (
        <div className="grid grid-cols-3">
           <div >
            <HourlyProductionChart></HourlyProductionChart>
           </div>
            <div>
                <LineWiseProduction></LineWiseProduction>
            </div>
            <div> 
                 <DelayReasons></DelayReasons>
            </div>
        </div>
    );
};

export default ProductionMonitoring;