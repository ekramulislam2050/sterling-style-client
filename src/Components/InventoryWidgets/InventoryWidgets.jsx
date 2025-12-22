import { Boxes, Scissors, AlertTriangle, Truck } from "lucide-react";

const InventoryWidgets = () => {
    const inventoryWidgets = [
        {
            id: 1,
            title: "Fabric Stock Overview",
            icon: Boxes,
            gradient: "from-indigo-500 to-indigo-700",
            items: [
                { label: "Available", value: "12,500 m" },
                { label: "Required", value: "15,000 m" },
            ],
        },
        {
            id: 2,
            title: "Trims Stock",
            icon: Scissors,
            gradient: "from-emerald-500 to-emerald-700",
            items: [
                { label: "Buttons", value: "45,000 pcs" },
                { label: "Zippers", value: "8,200 pcs" },
                { label: "Thread", value: "320 cones" },
            ],
        },
        {
            id: 3,
            title: "Low Stock Alerts",
            icon: AlertTriangle,
            gradient: "from-rose-500 to-rose-700",
            items: [
                { label: "Fabric Roll", value: "Below Min" },
                { label: "Poly Bag", value: "Critical" },
            ],
            alert: true,
        },
        {
            id: 4,
            title: "GRN / Delivery Pending",
            icon: Truck,
            gradient: "from-amber-500 to-amber-700",
            items: [
                { label: "Pending GRN", value: "6 Challans" },
                { label: "Late Delivery", value: "2 Vendors" },
            ],
        },
    ];

    return (
        <div className="">
             <h1 className="my-3 text-indigo-200 text-center">Inventory / Store Widgets</h1>
            <div className=" bg-linear-to-bl from-blue-800 to-green-900 p-6 rounded-2xl pb-8  min-h-[500px]  ">
               
                <div className="grid grid-cols-1  xl:grid-cols-2 gap-3 lg:grid-cols-2 xl:gap-6 md:grid-cols-2 md:gap-10 ">
                    {inventoryWidgets.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.id}
                                className={`xl:pb-7 rounded-tl-[40px] rounded-br-[40px] pt-4 px-5 xl:p-5 text-white bg-linear-to-br pb-6 ${card.gradient}
            shadow-lg hover:scale-[1.03] transition-all duration-300`}
                            >
                                <div className="flex items-center justify-between mb-4 xl:gap-10 md:gap-15 gap-15  ">
                                    <h3 className="text-lg font-semibold">{card.title}</h3>
                                    <Icon className="w-7 h-7 opacity-90" />
                                </div>

                                <div className="space-y-1 text-sm ">
                                    {card.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between  ">
                                            <span className="opacity-90">{item.label}</span>
                                            <span className="font-semibold">{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {card.alert && (
                                    <div className="mt-4 rounded-lg bg-white/20 px-3 py-2 text-xs font-semibold">
                                        ⚠ Store Manager Attention Needed
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InventoryWidgets;