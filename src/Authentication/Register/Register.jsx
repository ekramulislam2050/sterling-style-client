import { useState } from "react";



const Register = () => {
    const [loading, setLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState("")
    const handleImgUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        setLoading(true)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "sterling_styles-Ltd")
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            if (data.secure_url) {
                setImgUrl(data.secure_url)
                // todo:must be shown in this success msg-----------
            }

        } catch (err) {
            // todo:must be shown in this err message-----------
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="hero  min-h-screen py-5">

            <div className="card  w-full max-w-sm shrink-0 shadow-2xl border border-blue-400">
                <div className="card-body">
                    {/* heading */}
                    <h2 className="text-2xl font-bold text-center text-blue-500 pb-4">
                        রেজিস্টার করুন
                    </h2>
                    <fieldset className="fieldset">
                        <label className="label text-[#ffffff]">Name</label>
                        <input type="text" className="input bg-transparent border border-blue-400" placeholder="Name" required/>

                        <label className="label text-[#ffffff]">Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImgUpload}
                            className="  input  bg-transparent border border-blue-400" placeholder="photo" required/>
                        {loading && (
                            <p className="text-red-500 text-sm mt-2">ছবি আপলোড হচ্ছে...</p>
                        )}
                        <label className="label text-[#ffffff]">Email</label>
                        <input type="email" className="input bg-transparent border border-blue-400" placeholder="Email" required />

                        <label className="label text-[#ffffff]">Password</label>
                        <input type="password" className="input bg-transparent border border-blue-400" placeholder="Password" required/>
                        
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-blue-500 text-[#ffffff] ">রেজিস্টার</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Register;