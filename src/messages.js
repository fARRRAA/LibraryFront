import {  toast } from "react-toastify";

export const messageError = (error) => {
    toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true
    });
};
export const messageWarning = (error) => {
    toast.warning(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true
    });
};
export const messageSuccess = (error) => {
    toast.success(error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true
    });
};