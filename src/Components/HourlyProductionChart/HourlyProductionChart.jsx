import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const HourlyProductionChart = () => {
    const data = [
        { name: "9 AM", uv: 400, pv: 240 },
        { name: "10 AM", uv: 300, pv: 139 },
        { name: "11 AM", uv: 500, pv: 380 },
    ];
    return (
        <div className='flex flex-col items-center '>
            <h1 className='py-1 text-yellow-400'>Hourly Production Chart (Graph)</h1>
            <div className="  bg-linear-to-tr from-yellow-500 to-yellow-700 p-3 rounded-xl w-full">
                <LineChart

                    style={{ width: '100%', maxWidth: '700px', height: '100%', maxHeight: '70vh', aspectRatio: 1.618, }}
                    responsive
                    data={data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis width="auto" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </div>

        </div>
    );
};

export default HourlyProductionChart;