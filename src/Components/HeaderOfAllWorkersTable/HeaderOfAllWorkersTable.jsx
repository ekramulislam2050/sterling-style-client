

const HeaderOfAllWorkersTable = () => {
    return (
        <div>
            <div className="grid grid-cols-7 min-w-[900px] gap-4 px-4 py-3 rounded-lg font-semibold text-sm border-b">
                <div>Select</div>
                <div>Worker ID</div>
                <div>Name</div>
                <div>Department</div>
                <div>Designation</div>
                <div>Status</div>
                <div>Actions</div>
            </div>
        </div>
    );
};

export default HeaderOfAllWorkersTable;