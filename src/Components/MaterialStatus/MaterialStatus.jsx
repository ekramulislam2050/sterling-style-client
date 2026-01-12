

const MaterialStatus = ({order}) => {
    return (
        <div className="bg-orange-900/70 rounded-xl p-3 md:p-4">
            <h3 className="font-semibold mb-3">Material Status</h3>

            <ul className="space-y-2 text-xs md:text-sm">
                <li className="text-red-400">❌ Fabric: Not Arrived</li>
                <li className="text-green-400">✔ Buttons: In Stock</li>
                <li className="text-yellow-400">⚠ Zipper: Short</li>
            </ul>
        </div>

    );
};

export default MaterialStatus;