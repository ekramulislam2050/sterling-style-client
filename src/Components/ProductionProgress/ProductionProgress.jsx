const ProductionProgress = ({ progress = 0 }) => {
 
  const getProgressColor = (value) => {
    if (value < 40) return "from-red-500 to-yellow-500";
    if (value < 70) return "from-yellow-400 to-green-400";
    return "from-green-500 to-blue-500";
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-1">Production Progress: {progress}%</h3>
      <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-5 rounded-full bg-linear-to-r ${getProgressColor(progress)} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProductionProgress;