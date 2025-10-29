import AuthContext from "../AuthContext/AuthContext";

 
const AuthProvider = ({children}) => {
    const name="ekramul"
    const authInfo={
       name,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
            
       
    );
};

export default AuthProvider;