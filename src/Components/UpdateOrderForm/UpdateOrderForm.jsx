import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { toast } from "react-toastify";
import ErrMsg from "../../SuccessAndErrMsg/ErrMsg/ErrMsg";
import { useNavigate } from "react-router-dom";

const UpdateOrderForm = ({ order }) => {
  const navigate=useNavigate()
  const axiosSecure = useAxiosSecure()

  const isMerchandiser = true;
  const isProduction = false;
  const isSample = false;
  const isMaterial = false;

  const isPermission = isMerchandiser || isProduction || isSample || isMaterial

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (order) reset(order);
  }, [order, reset]);


  // onsubmit------------------
  const onSubmit = async (data) => {
    let updatePayload = {};

    // ================= Merchandiser =================
    if (isMerchandiser) {
      updatePayload = {
        ...updatePayload,
        orderQty: data.orderQty,
        "tna.shipment.planned": data.tna.shipment.planned,
        "tna.shipment.actual": data.tna.shipment.actual,
        "tna.shipment.status": data.tna.shipment.status,
      };
    }

    // ================= Sample Team =================
    if (isSample) {
      updatePayload = {
        ...updatePayload,
        samples: data.samples,
      };
    }

    // ================= Material Team =================
    if (isMaterial) {
      updatePayload = {
        ...updatePayload,
        "tna.materials": data.tna.materials,
      };
    }

    // ================= Production Team =================
    if (isProduction) {
      updatePayload = {
        ...updatePayload,
        "tna.production": data.tna.production,
      };
    }

    try {
      const res = await axiosSecure.patch(
        `/api/patchOrders/${data?._id}`,
        updatePayload
      );
         if(res.data.acknowledged==true){
             toast.success("Update success")
             navigate("/merchandise")
         }
      
    } catch (error) {
      console.error("Update Failed:", error);
       ErrMsg(error.message)
    }
  };

  return (
    <div className="pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto bg-slate-900 p-6 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Edit Order - {order?.styleNo}
        </h2>

        {/* ================= BASIC INFO ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4 border-b border-slate-600 pb-2">
            📌 Basic Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Buyer</label>
              <input {...register("buyer")} disabled className="input-style" />
            </div>

            <div>
              <label className="label">Style No</label>
              <input {...register("styleNo")} disabled className=" input-style" />
            </div>

            <div>
              <label className="label">Order Date</label>
              <input type="date" {...register("orderDate")} disabled className="input-style" />
            </div>

            <div>
              <label className="label">Order Qty</label>
              <input type="number" {...register("orderQty")} className="input-style disabled:cursor-not-allowed disabled:opacity-70" disabled={!isMerchandiser} />
            </div>
          </div>
        </div>

        <div className="text-gray-400 text-sm mt-2 mb-6">
          Created At: {new Date(order?.createdAt).toLocaleString()}
        </div>

        {/* ================= SAMPLES ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700 mt-8">
          <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-slate-600 pb-2">
            🧪 Samples Status
          </h3>

          {order?.samples?.map((sample, index) => (
            <div key={index} className="flex justify-between items-center mb-4 bg-slate-700 p-3 rounded-lg">
              <span className="font-medium text-white">{sample.name}</span>

              <select
                {...register(`samples.${index}.status`)}
                className="input-style w-40 bg-[#0f172a] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={!isSample}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          ))}
        </div>

        {/* ================= MATERIALS ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700 mt-8">
          <h3 className="text-xl font-semibold text-emerald-400 mb-4 border-b border-slate-600 pb-2">
            🧵 Materials TNA
          </h3>

          {order?.tna?.materials &&
            Object.keys(order.tna.materials).map((key) => (
              <div
                key={key}
                className="grid md:grid-cols-4 gap-4 items-center bg-slate-700 p-4 rounded-lg mb-4"
              >
                <div className="font-semibold capitalize text-white">{key}</div>

                <div>
                  <label className="label">Planned</label>
                  <input
                    type="date"
                    {...register(`tna.materials.${key}.planned`)}
                    className="input-style disabled:cursor-not-allowed disabled:opacity-70" disabled={!isMaterial}
                  />
                </div>

                <div>
                  <label className="label">Actual</label>
                  <input
                    type="date"
                    {...register(`tna.materials.${key}.actual`)}
                    className="input-style" disabled={!isMaterial}
                  />
                </div>

                <div>
                  <label className="label">Status</label>
                  <select
                    {...register(`tna.materials.${key}.status`)}
                    className="input-style  bg-[#0f172a] disabled:cursor-not-allowed disabled:opacity-70" disabled={!isMaterial}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>
              </div>
            ))}
        </div>


        {/* ================= PRODUCTION ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700 mt-8">
          <h3 className="text-xl font-semibold text-orange-400 mb-4 border-b border-slate-600 pb-2">
            🏭 Production Timeline
          </h3>

          {order?.tna?.production &&
            Object.keys(order.tna.production).map((stage) => (
              <div
                key={stage}
                className="grid md:grid-cols-4 gap-4 items-center bg-slate-700 p-4 rounded-lg mb-4"
              >
                <div className="font-semibold capitalize text-white">{stage}</div>

                <div>
                  <label className="label">Planned</label>
                  <input
                    type="date"
                    {...register(`tna.production.${stage}.planned`)}
                    disabled={!isProduction}
                    className="input-style bg-gray-700 disabled:cursor-not-allowed disabled:opacity-70  "
                  />
                </div>

                <div>
                  <label className="label">Actual</label>
                  <input
                    type="date"
                    {...register(`tna.production.${stage}.actual`)}
                    disabled={!isProduction}
                    className="input-style bg-gray-700  disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </div>

                <div>
                  <label className="label">Status</label>
                  <select
                    {...register(`tna.production.${stage}.status`)}
                    disabled={!isProduction}
                    className="input-style bg-gray-700  disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="delayed">Delayed</option>
                  </select>
                </div>
              </div>
            ))}
        </div>


        {/* ================= SHIPMENT ================= */}
        <div className="bg-slate-800 p-6 rounded-xl shadow-md border border-slate-700 mt-8">
          <h3 className="text-xl font-semibold text-cyan-400 mb-4 border-b border-slate-600 pb-2">
            🚚 Shipment Details
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="label">Planned Shipment</label>
              <input
                type="date"
                {...register("tna.shipment.planned")}
                disabled={!isMerchandiser}
                className="input-style disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div>
              <label className="label">Actual Shipment</label>
              <input
                type="date"
                {...register("tna.shipment.actual")}
                disabled={!isMerchandiser}
                className="input-style disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div>
              <label className="label">Shipment Status</label>
              <select
                {...register("tna.shipment.status")}
                disabled={!isMerchandiser}
                className="input-style  bg-[#0f172a] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn btn-primary w-full mt-8 disabled:cursor-not-allowed disabled:opacity-70" disabled={!isPermission}>
          Update Order
        </button>
      </form>
    </div>
  );
};

export default UpdateOrderForm;