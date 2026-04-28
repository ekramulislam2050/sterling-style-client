

const HeaderOfAttendancePage = ({data={}}) => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Attendance Dashboard</h1>
            <div>
                {
                    data.pages?.map((pages, idx) => <div key={idx} className="relative">
                        <div className="px-2 py-1">
                            <span className="text-blue-300 font-semibold">Page : {pages.page}</span>
                            <span className="text-green-300 mx-1 font-semibold">
                                <span className="pr-1 text-xl text-yellow-300">&#8594;</span>
                                Records : {pages.data.length}
                                <span className="pl-1 text-xl text-yellow-300">&#8594;</span>
                            </span>
                            <span className="text-red-400 font-semibold"> Total : {pages.total} </span>
                        </div>
                        {/* Rotating Border----------------- */}
                        <span className="absolute inset-0 rounded-xl border-2 border-cyan-400 
        animate-rotate-border"></span>

                    </div>)
                }
            </div>

        </div>
    );
};

export default HeaderOfAttendancePage;