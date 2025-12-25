import { useState } from "react";

const CreateOrder = () => {
    const [order, setOrder] = useState({
        buyer: "",
        styleNo: "",
        orderQty: "",
        orderDate: "",
        exFactoryDate: "",
        season: ""
    });


    const handleChange = e => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(() => alert("Order Created"));
    };


    return (
        <div className="p-1    ">

            <div className="mt-22 ">
                <div className="px-6">
                    <h2 className="  bg-linear-to-r from-indigo-900 to-blue-800 py-4 rounded-t-2xl pl-3 text-xl font-semibold" >Create Your Order</h2>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4
                   p-6 rounded-xl"
                >
                    <input name="buyer" placeholder="Buyer" onChange={handleChange}
                        className="input input-bordered bg-zinc-600" />

                    <input name="styleNo" placeholder="Style No" onChange={handleChange}
                        className="input input-bordered bg-zinc-600" />

                    <input name="orderQty" type="number" placeholder="Quantity"
                        onChange={handleChange}
                        className="input input-bordered bg-zinc-600" />

                    <input name="orderDate" type="date" onChange={handleChange}
                        className="input input-bordered bg-zinc-600" />

                    <input name="exFactoryDate" type="date" onChange={handleChange}
                        className="input input-bordered bg-zinc-600" />

                    <input name="season" placeholder="Season" onChange={handleChange}
                        className="input input-bordered bg-zinc-600" />

                    <button className="btn btn-primary col-span-full rounded-b-2xl">
                        Save Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateOrder;