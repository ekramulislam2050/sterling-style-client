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
                ErrMsg("Failed to fetch worker details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchWorkerDetails();
        }
    }, [id, axiosSecure]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!workerDetails) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-gray-500 text-lg">
                    No worker information found.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-28">
            <div className="bg-blue-950/80 rounded-2xl shadow-xl      overflow-hidden">

                {/* Header */}
                <div className="p-8  ">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">

                        <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center text-3xl font-bold">
                            {workerDetails?.name?.charAt(0)}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-blue-500">
                                {workerDetails?.name}
                            </h1>

                            <p className="text-red-500 mt-1 ">
                                Worker ID: {workerDetails?.workerId}
                            </p>

                            <div className="mt-3">
                                <span className="badge badge-success">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 p-8">

                    <div className="bg-blue-700 rounded-xl p-5">
                        <h3 className="font-semibold text-lg mb-4">
                            Personal Information
                        </h3>

                        <div className="space-y-2">
                            <p>
                                <span className="font-medium">Name:</span>{" "}
                                {workerDetails?.name}
                            </p>

                            <p>
                                <span className="font-medium">Gender:</span>{" "}
                                {workerDetails?.gender || "N/A"}
                            </p>

                            <p>
                                <span className="font-medium">Phone:</span>{" "}
                                {workerDetails?.phone || "N/A"}
                            </p>

                            <p>
                                <span className="font-medium">Address:</span>{" "}
                                {workerDetails?.address || "N/A"}
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-800 rounded-xl p-5">
                        <h3 className="font-semibold text-lg mb-4">
                            Employment Information
                        </h3>

                        <div className="space-y-2">
                            <p>
                                <span className="font-medium">Department:</span>{" "}
                                {workerDetails?.department || "N/A"}
                            </p>

                            <p>
                                <span className="font-medium">Designation:</span>{" "}
                                {workerDetails?.designation || "N/A"}
                            </p>

                            <p>
                                <span className="font-medium">Shift:</span>{" "}
                                {workerDetails?.shift || "N/A"}
                            </p>

                            <p>
                                <span className="font-medium">Joining Date:</span>{" "}
                                {workerDetails?.joiningDate || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-base-300 p-6 text-sm text-red-500">
                    Employee Record Information
                </div>
            </div>
        </div>
    );
};

export default WorkerDetails;