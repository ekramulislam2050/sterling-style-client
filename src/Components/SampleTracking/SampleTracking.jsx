import SampleItem from "../SampleItem/SampleItem";


const SampleTracking = () => {
    return (
        <div className="bg-indigo-600/50 rounded-xl p-3 md:p-4">
            <h3 className="font-semibold mb-3">Sample Tracking</h3>

            <SampleItem name="Fit Sample" status="Approved" />
            <SampleItem name="PP Sample" status="Pending" />
            <SampleItem name="Size Set" status="Rejected" />
        </div>
    );
};

export default SampleTracking;