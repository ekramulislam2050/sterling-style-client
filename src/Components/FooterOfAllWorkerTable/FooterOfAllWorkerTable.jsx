

const FooterOfAllWorkerTable = ({ loading, allWorkersData = [] }) => {
    return (
        <div>
            {loading ? (
                <p className="text-center text-gray-400">
                    Loading more workers...
                </p>) : (
                <p className="text-center text-gray-500">
                    All workers loaded ({allWorkersData.length})
                </p>)
            }


        </div>
    );
};

export default FooterOfAllWorkerTable;