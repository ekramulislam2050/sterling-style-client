

const Footer = () => {
    return (
        <footer className=" bg-linear-to-r   via-blue-400 
            drop-shadow-[0_0_35px_rgba(0,200,255,0.5)] text-gray-300 py-6  ">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3 py-10">

                <div className="text-center md:text-left">
                    <p className="font-semibold text-white">© 2025 Sterling Styles Ltd.</p>
                    <p className="text-sm">All Rights Reserved.</p>
                </div>

                <div className="text-center text-sm">
                    <p>System Version: <span className="text-blue-400">v1.0.4</span></p>
                    <p>Last Update: Jan 2025</p>
                </div>

                <div className="text-center md:text-right text-sm">
                    <p>Need Support?</p>
                    <p className="text-blue-400">support@company.com</p>
                    <p>IT Desk: +8801XXXXXXXXX</p>
                </div>

            </div>
        </footer>

    );
};

export default Footer;