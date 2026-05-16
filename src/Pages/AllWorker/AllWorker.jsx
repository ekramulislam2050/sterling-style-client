
import TableForAllWorkers from "../../Components/TableForAllWorkers/TableForAllWorkers";



const AllWorker = () => {


  return (
    <div className="p-6 pt-30">
      {/* Top section---------------- */}
      <div>
        <h2 className="text-2xl font-bold">All Workers</h2>

      </div>


      {/* Workers table */}
      <TableForAllWorkers />
    </div>
  );
};

export default AllWorker;