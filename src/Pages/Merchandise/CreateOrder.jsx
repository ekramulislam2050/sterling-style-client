import { useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";
import SuccessMsg from "../../SuccessAndErrMsg/successMsg/successMsg";
import { useNavigate } from "react-router-dom";
import CreateOrderForm from "../../Components/CreateOrderForm/CreateOrderForm";

const CreateOrder = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const qty = Number(order.orderQty) || 0;

        const payload = {
            buyer: order.buyer,
            styleNo: order.styleNo,
            orderQty: qty,
            orderDate: order.orderDate,
            exFactoryDate: order.exFactoryDate,
            season: order.season,

            // Default value----

            // ================= SAMPLES =================
            samples: [
                { name: "Proto Sample", status: "Pending", date: "" },
                { name: "Fit Sample", status: "Pending", date: "" },
                { name: "PP Sample", status: "Pending", date: "" },
                { name: "Size Set", status: "Pending", date: "" }
            ],

            // ================= TNA =================
            tna: {
                materials: {
                    fabric: { planned: "", actual: "", status: "pending" },
                    button: { planned: "", actual: "", status: "pending" },
                    zipper: { planned: "", actual: "", status: "pending" }
                },
                inventory: {
                    fabric: { receivedQty: 0, issuedQty: 0 },
                    button: { receivedQty: 0, issuedQty: 0 },
                    zipper: { receivedQty: 0, issuedQty: 0 }
                },
                production: {
                    cutting: { planned: "", actual: "", actualQty: 0, status: "pending" },
                    sewing: { planned: "", actual: "", actualQty: 0, status: "pending" },
                    finishing: { planned: "", actual: "", actualQty: 0, status: "pending" }
                   

                },
                shipment: {
                    planned: order.exFactoryDate || "",
                    actual: "",
                    status: "pending"
                }
            },

            // ================= HR =================
            hr: {
                    assignedEmployees: [
                        { name: "", role: "staff", active: true } // Default row
                    ],
                attendance: [
                    { employeeName: "", checkIn: "", checkOut: "", status: "present" }
                ],
                payroll: [
                    { employeeName: "", basic: 0, allowance: 0, deduction: 0 }
                ]
            },

            createdAt: new Date()
        };

        try {
            const res = await axiosSecure.post('/api/postOrders', payload);

            if (res.data) {
                SuccessMsg('Order Created Successfully ✅');

                setOrder({
                    buyer: "",
                    styleNo: "",
                    orderQty: "",
                    orderDate: "",
                    exFactoryDate: "",
                    season: ""
                });

                navigate("/merchandise");
            }

        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong";

            ErrMsg(message);
        }
    };

    return (
        <div>
            <CreateOrderForm
                order={order}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
        </div>
    );
};

export default CreateOrder;