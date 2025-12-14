import { Package, Target, CheckCircle, Rows, Gauge, Boxes } from "lucide-react";

const topSummary = [
    {
        id: 1,
        title: "Running Orders",
        value: 28,
        unit: "",
        icon: Package,
        color: "from-red-500 to-red-700",
    },
    {
        id: 2,
        title: "Today Target",
        value: 12500,
        unit: "pcs",
        icon: Target,
        color: "from-orange-400 to-orange-600",
    },
    {
        id: 3,
        title: "Today Achieved",
        value: 10340,
        unit: "pcs",
        icon: CheckCircle,
        color: "from-yellow-400 to-yellow-600",
    },
    {
        id: 4,
        title: "Active Lines",
        value: 8,
        unit: "lines",
        icon: Rows,
        color: "from-green-500 to-green-700",
    },
    {
        id: 5,
        title: "Efficiency %",
        value: 82,
        unit: "%",
        icon: Gauge,
        color: "from-blue-500 to-blue-700",
    },
    {
        id: 6,
        title: "WIP (pcs)",
        value: 4200,
        unit: "pcs",
        icon: Boxes,
        color: "from-indigo-200 to-indigo-800",
    },
];

const ProductionOverview = () => {
    return (
        <div className="mt-5 sm:p-4">

            <div className="
        mt-10
        flex flex-col
        bg-linear-to-br from-red-900 via-green-900 to-indigo-900
        pt-4 pb-6 px-3
        rounded-3xl
      ">

                {/* Heading */}
                <h1 className="
          text-center mb-4
          text-base sm:text-lg md:text-xl
          font-semibold text-red-300
        ">
                    Production Overview
                </h1>

                {/* Cards Grid */}
                <div className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-3 sm:gap-4
          place-items-center
        ">
                    {topSummary.map((data) => {
                        const Icon = data.icon;
                        return (
                            <div key={data.id} className="flex justify-center w-full">
                                <div className="avatar">
                                    <div
                                        className={`
                      mask mask-hexagon-2
                      bg-linear-to-br ${data.color}
                      w-36 h-36
                      sm:w-40 sm:h-40
                      md:w-44 md:h-44
                      lg:w-40 lg:h-40
                      shadow-xl
                      transition-transform duration-300
                      hover:scale-105
                    `}
                                    >
                                        <div className="flex flex-col items-center justify-center h-full px-3 text-white text-center">
                                            <Icon size={26} className="mb-1 sm:mb-2 opacity-90" />
                                            <p className="text-xs sm:text-sm font-medium opacity-90 leading-tight">
                                                {data.title}
                                            </p>
                                            <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                                                {data.value}
                                                <span className="text-xs sm:text-sm font-normal ml-1">
                                                    {data.unit}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default ProductionOverview;