import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../AuthContext/AuthContext";




const Register = () => {
    const {signUp,updateUserProfile}=useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState("")

    // handle register--------------
    const handleRegister = async(e) => {
        e.preventDefault()
        const formData= new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        // sing up---------------
          const res = await signUp(data.email,data.password)
 
          if(res.user){
             updateUserProfile(data.name,data.imgUrl)
             console.log(res.user)
          }
    }

    // img handle by cloudinary--------------
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
            // console.log('cloudinary',data)
            if (data.secure_url) {
                setImgUrl(data.secure_url)
                toast.success("ছবি আপলোড সফল হয়েছে ")
            }

        } catch (err) {
            toast.error('ছবি আপলোড বার্থ হয়েছে ')
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
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset">
                            <label className="label text-[#ffffff]">Name</label>
                            <input type="text" className="input bg-transparent border border-blue-400" placeholder="Name" name="name" required />

                            <label className="label text-[#ffffff]">Photo</label>

                            {
                                loading ?
                                    <div className="skeleton input bg-transparent"></div>
                                    :
                                    imgUrl ? <input
                                        type="text"
                                        readOnly
                                        name="imgUrl"
                                        value={imgUrl}
                                        className="input bg-transparent border border-green-400 text-xs text-green-300"
                                    /> :
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImgUpload}
                                            className="  input  bg-transparent border border-blue-400" placeholder="photo" required />
                            }
                            <label className="label text-[#ffffff]">Email</label>
                            <input type="email" className="input bg-transparent border border-blue-400" placeholder="Email" name="email" required />

                            <label className="label text-[#ffffff]">Password</label>
                            <input type="password" className="input bg-transparent border border-blue-400" placeholder="Password" name="password" required />

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn bg-blue-500 text-[#ffffff] "  type="submit">রেজিস্টার</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;