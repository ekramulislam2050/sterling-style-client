import Swal from "sweetalert2";


const SuccessMsg = (successMsg) => {
    Swal.fire({
        title: "Good job!",
        text:`${successMsg}`,
        icon: "success"
    });
     
};

export default SuccessMsg;