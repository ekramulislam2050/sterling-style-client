

const CreateOrderForm = ({order={},handleSubmit,handleChange}) => {
    return (
        <div className="p-1">
            <div className="mt-22">
                <div className="px-6">
                    <h2 className="bg-linear-to-r from-indigo-900 to-blue-800 py-4 rounded-t-2xl pl-3 text-xl font-semibold">
                        Create Your Order
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl"
                >
                    <div className="flex flex-col">
                        <label className="text-sm text-slate-200">Buyer</label>
                        <input
                            name="buyer"
                            value={order.buyer}
                            onChange={handleChange}
                            className="input input-bordered bg-zinc-600"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-slate-200">Style No</label>
                        <input
                            name="styleNo"
                            value={order.styleNo}
                            onChange={handleChange}
                            className="input input-bordered bg-zinc-600"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-slate-200">Order Qty</label>
                        <input
                            name="orderQty"
                            type="number"
                            value={order.orderQty}
                            onChange={handleChange}
                            className="input input-bordered bg-zinc-600"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-slate-200">Order Date</label>
                        <input
                            name="orderDate"
                            type="date"
                            value={order.orderDate}
                            onChange={handleChange}
                            className="input input-bordered bg-zinc-600"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-slate-200">Ex-Factory Date</label>
                        <input
                            name="exFactoryDate"
                            type="date"
                            min={order.orderDate}
                            value={order.exFactoryDate}
                            onChange={handleChange}
                            className="input input-bordered bg-zinc-600"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-slate-200">Season</label>
                        <input
                            name="season"
                            value={order.season}
                            onChange={handleChange}
                            className="input input-bordered bg-zinc-600"
                            required
                        />
                    </div>

                    <button className="btn btn-primary col-span-full rounded-b-2xl">
                        Save Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateOrderForm;