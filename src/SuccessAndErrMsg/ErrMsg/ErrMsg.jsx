import Swal from "sweetalert2";


const ErrMsg = (errMsg) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text:`${errMsg}`,
        footer: '<a href="#">Why do I have this issue?</a>'
    })
};

export default ErrMsg;