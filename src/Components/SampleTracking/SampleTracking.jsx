import SampleItem from "../SampleItem/SampleItem";

const SampleTracking = ({ orders = [] }) => {
   
    const samples = orders.length > 0 ? orders[0].samples : [];

    return (
        <div className="bg-indigo-600/50 rounded-xl p-3 md:p-4">
            <h3 className="font-semibold mb-3">Sample Tracking</h3>

            {samples.length === 0 ? (
                <p className="text-slate-200">No samples available</p>
            ) : (
                samples.map((sample, index) => (
                    <SampleItem
                        key={index}
                        name={sample.name}
                        status={sample.status}
                    />
                ))
            )}
        </div>
    );
};

export default SampleTracking;
