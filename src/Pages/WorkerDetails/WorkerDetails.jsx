import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";

const WorkerDetails = () => {
    const [loading, setLoading] = useState(true);
    const [workerDetails, setWorkerDetails] = useState(null);

    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    useEffect(() => {
        const fetchWorkerDetails = async () => {
            try {
                const res = await axiosSecure.get(
                    `/api/getWorkerDetailsById/${id}`
                );
                setWorkerDetails(res.data);
            } catch (err) {
                console.error(err);
                ErrMsg("Failed to fetch worker details to workerDetails component");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchWorkerDetails();
        }
    }, [id, axiosSecure]);

    return (
        <div className="text-white pt-30">
            {loading ? (
                <p>Loading...</p>
            ) : workerDetails ? (
                <div>
                    <h1>{workerDetails?.name}</h1>
                    <p>{workerDetails?.department}</p>
                </div>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
};

export default WorkerDetails;