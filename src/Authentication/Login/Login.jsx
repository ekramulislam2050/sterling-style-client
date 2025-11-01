import { Link } from "react-router-dom";


const Login = () => {
    return (
        <div className="hero  min-h-screen py-5">
            <div className="card  w-full max-w-sm shrink-0 shadow-2xl border border-blue-400">
                <div className="card-body">
                    {/* heading */}
                    <h2 className="text-2xl font-bold text-center text-blue-500 pb-4">
                        লগইন করুন
                    </h2>
                    {/* Google */}
                    <button className="btn  btn-dash border-blue-300     ">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    {/* divider---------- */}
                    <div className="divider divider-info">OR</div>
                    <fieldset className="fieldset">
                        <label className="label text-[#ffffff]">Email</label>
                        <input type="email" className="input bg-transparent border border-blue-400" placeholder="Email" />
                        <label className="label text-[#ffffff]">Password</label>
                        <input type="password" className="input bg-transparent border border-blue-400" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-dash border-blue-300">লগইন</button>
                        <div className="flex flex-col items-center pt-3">
                            <p className="pb-3">যদি আপনার লগইন একাউন্ট না থাকে ,দয়া করে রেজিস্টার করুন </p>
                            <Link className="btn w-full bg-blue-500 text-[#ffffff]" to={"/register"}>রেজিস্টার </Link>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Login;