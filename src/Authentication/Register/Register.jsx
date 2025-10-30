
const Register = () => {

    return (
        <div className="hero  min-h-screen">

            <div className="card  w-full max-w-sm shrink-0 shadow-2xl border border-blue-400">
                <div className="card-body">
                    <fieldset className="fieldset">
                        <label className="label text-[#ffffff]">Name</label>
                        <input type="text" className="input bg-transparent border border-blue-400" placeholder="Name" />
                        <label className="label text-[#ffffff]">Email</label>
                        <input type="email" className="input bg-transparent border border-blue-400" placeholder="Email" />
                        <label className="label text-[#ffffff]">Password</label>
                        <input type="password" className="input bg-transparent border border-blue-400" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Register;