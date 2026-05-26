import SummaryCardOfAllWorkers from "../../Components/SummaryCardOfAllWorkers/SummaryCardOfAllWorkers"
import TableForAllWorkers from "../../Components/TableForAllWorkers/TableForAllWorkers";

const AllWorker = () => {


  return (
    <div className="p-6 pt-30">
      {/* Heading---------------- */}
      <h2 className="text-2xl font-bold">All Workers</h2>
      {/* summary------------------------------ */}
      <SummaryCardOfAllWorkers></SummaryCardOfAllWorkers>

      {/* Workers table---------- */}
      <TableForAllWorkers />
    </div>
  );
};

export default AllWorker;