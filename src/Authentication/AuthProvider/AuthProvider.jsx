import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "../AuthContext/AuthContext";
import auth from "../../firebase/firebase.init";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // sign up------------
    const signUp = (email, password) => {
             console.log(email,password)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    // signIn-----------
    const signIn = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)

    }

    // signIn by google----------
    const provider = new GoogleAuthProvider()
    const signInByGoogle = () => {

        return signInWithPopup(auth, provider)

    }

    // signOut-----------
    const logOut = () => {

        return signOut(auth)

    }

    // updatedUserProfile-----------
    const updateUserProfile = (name, photo) => {
        if (!auth.currentUser) return Promise.reject("no user logged in")
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // observer auth state changes---------
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
  
            // for jwt token-------------
            if (currentUser) {
                const userEmail = { email: currentUser.email }
                axios.post(`http://localhost:5000/jwt`, userEmail,{headers:{"Content-Type":"application/json"}})
                    .then((res) => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                        } else {
                            localStorage.removeItem("access-token")
                        }
                    })
                    .catch((err) => {
                        toast.error("jwt টোকেন ব্যর্থ  হয়েছে ")
                        localStorage.removeItem("access-token")
                    })
                    .finally(() => {
                        setLoading(false)
                    })
            }else{
                localStorage.removeItem("access-token")
                setLoading(false)
            }

        })
        return () => unsubscribe()
    }, [])

    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        signInByGoogle,
        logOut,
        updateUserProfile,
        setLoading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>


    );
};

export default AuthProvider;