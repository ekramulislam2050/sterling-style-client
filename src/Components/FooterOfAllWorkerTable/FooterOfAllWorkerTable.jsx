

const FooterOfAllWorkerTable = ({ loading, hasMore, total }) => {
    return (
        <div>
            {loading && (
                <p className="text-center text-gray-400">
                    Loading more workers...
                </p>
            )}

            {!hasMore && (
                <p className="text-center text-gray-500">
                    All workers loaded ({total})
                </p>
            )}
        </div>
    );
};

export default FooterOfAllWorkerTable;