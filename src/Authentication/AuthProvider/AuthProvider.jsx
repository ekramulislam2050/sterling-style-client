import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "../AuthContext/AuthContext";
import auth from "../../firebase/firebase.init";
import { useEffect, useState } from "react";


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // sign up------------
    const signUp = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)

    }

    // signIn-----------
    const signIn = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)

    }

    // signIn by google----------
    const provider = new GoogleAuthProvider()
    const signInByGoogle = () => {

        return signInWithPopup(auth,provider)

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
            setLoading(false)
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