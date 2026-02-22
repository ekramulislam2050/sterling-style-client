import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UpdateOrderForm = ({ order }) => {
  const isMerchandiser = true;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (order) reset(order); // fill form after order loaded
  }, [order, reset]);

  const onSubmit = (data) => {
    console.log("Updated Order:", data);
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
              <input type="number" {...register("orderQty")} className="input-style" />
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
                className="input-style w-40 bg-[#0f172a]"
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
                    className="input-style"
                  />
                </div>

                <div>
                  <label className="label">Actual</label>
                  <input
                    type="date"
                    {...register(`tna.materials.${key}.actual`)}
                    className="input-style"
                  />
                </div>

                <div>
                  <label className="label">Status</label>
                  <select
                    {...register(`tna.materials.${key}.status`)}
                    className="input-style  bg-[#0f172a]"
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
                    disabled
                    className="input-style bg-gray-700 cursor-not-allowed opacity-70"
                  />
                </div>

                <div>
                  <label className="label">Actual</label>
                  <input
                    type="date"
                    {...register(`tna.production.${stage}.actual`)}
                    disabled
                    className="input-style bg-gray-700 cursor-not-allowed opacity-70"
                  />
                </div>

                <div>
                  <label className="label">Status</label>
                  <select
                    {...register(`tna.production.${stage}.status`)}
                    disabled
                    className="input-style bg-gray-700 cursor-not-allowed opacity-70"
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
                className="input-style"
              />
            </div>

            <div>
              <label className="label">Actual Shipment</label>
              <input
                type="date"
                {...register("tna.shipment.actual")}
                disabled={!isMerchandiser}
                className="input-style"
              />
            </div>

            <div>
              <label className="label">Shipment Status</label>
              <select
                {...register("tna.shipment.status")}
                disabled={!isMerchandiser}
                className="input-style  bg-[#0f172a]"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="delayed">Delayed</option>
              </select>
            </div>
          </div>
        </div>

        <button className="btn btn-primary w-full mt-8">
          Update Order
        </button>
      </form>
    </div>
  );
};

export default UpdateOrderForm;