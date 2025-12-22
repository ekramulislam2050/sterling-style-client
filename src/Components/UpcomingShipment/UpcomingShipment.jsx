

const UpcomingShipmentCards = () => {
  const shipments = [
    { id: 101, name: "Shipment A", deadline: "2025-12-18", quantity: 500, qcStatus: "Passed", line: "Line 1", responsible: "John Doe" },
    { id: 102, name: "Shipment B", deadline: "2025-12-17", quantity: 300, qcStatus: "Rejected", line: "Line 2", responsible: "Jane Smith" },
    { id: 103, name: "Shipment C", deadline: "2025-12-19", quantity: 450, qcStatus: "Passed", line: "Line 3", responsible: "Ali Khan" },
    { id: 103, name: "Shipment C", deadline: "2025-12-19", quantity: 450, qcStatus: "Passed", line: "Line 3", responsible: "Ali Khan" },
  ];

  return (
    <div className="flex flex-col items-center  w-full pr-1"> 
      <h2 className=" my-3 text-yellow-400"> Upcoming Shipments</h2>
      <div className=" sm:p-6   p-6  bg-linear-to-br to-red-900 via-green-900 from-indigo-900 rounded-2xl lg:h-[520px]  w-full">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="bg-linear-to-r from-red-900 to-red-700 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-semibold text-lg mb-2">{shipment.name}</h3>
              <p className="text-gray-200 mb-1">Deadline: <span className="font-medium">{shipment.deadline}</span></p>
              <p className="text-gray-200 mb-1">Quantity: <span className="font-medium">{shipment.quantity}</span></p>
              <p className="text-gray-200 mb-1">
                QC Status:{" "}
                <span className={`ml-2 px-2 py-1 rounded-full text-white text-sm ${shipment.qcStatus === "Passed" ? "bg-green-500" : "bg-red-500"}`}>
                  {shipment.qcStatus}
                </span>
              </p>
              <p className="text-gray-200 mb-1">Line: <span className="font-medium">{shipment.line}</span></p>
              <p className="text-gray-200">Responsible: <span className="font-medium">{shipment.responsible}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingShipmentCards;
