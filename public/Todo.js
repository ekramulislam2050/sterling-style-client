// to do add Designation with user name will.

// 1.updateOrderForm কম্পোনেন্টে user এর role base কাজ বাকি আছে

// 2.backend এ posts .route এ autoGenerateTNA   function এর ভেতর addDays ()এর ভেতর auto যে দিন গুলো add করা হচ্ছে সে গুলো নিয়ে গবেষণা করতে হবে। দিন গুলো auto যোগ হবে ,কি না ?

// qty ,date db তে string হিসাবে যাচ্ছে এটা number এ কনভার্ট করতে হবে 

// প্ৰত্যেকটা component ,page এর error message গুলো modify করতে হবে, বিশেষ করে নিজে  message তৈরি করে error এর সাথে add করতে হবে, যেখানে কোন পেজ/কম্পোনেন্ট থেকে সেই   error তৈরি হচ্ছে তা উল্লেখ থাকবে। 

import { Link } from "react-router-dom";

const HrActionButtons = ({ _idsOfSelectedWorkers = [] }) => {
    return (
        <div className="border border-gray-700 rounded-xl p-3">
            <h3 className="text-sm font-semibold text-green-400 mb-2">
                HR Actions
            </h3>

            <div className="flex flex-col">
                <Link
                    to="/attendance"
                    className="px-3 py-1.5 rounded-md text-xs font-medium text-white bg-green-700 hover:bg-green-600 mb-1 text-center"
                >
                    Attendance
                </Link>

                <div className="flex flex-wrap gap-2">
                    <Link
                        to="/exportWorkers"
                        state={{
                            selectedWorkerIds: _idsOfSelectedWorkers
                        }}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all ${
                            _idsOfSelectedWorkers.length === 0
                                ? "bg-blue-500 opacity-50 cursor-not-allowed pointer-events-none"
                                : "bg-blue-700 hover:bg-blue-600"
                        }`}
                        aria-disabled={_idsOfSelectedWorkers.length === 0}
                        onClick={(e) => {
                            if (_idsOfSelectedWorkers.length === 0) {
                                e.preventDefault();
                            }
                        }}
                    >
                        Export
                    </Link>

                    {/* Transfer এবং Payroll আগের মতো থাকবে */}
                </div>
            </div>
        </div>
    );
};

export default HrActionButtons;