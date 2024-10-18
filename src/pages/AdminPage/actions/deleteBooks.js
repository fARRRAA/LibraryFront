import { ToastContainer, toast } from "react-toastify";
import { getBooks } from '../../Books/getBooks';

const messageError = (error) => {
    toast.error(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true
    });
};
const messageWarning = (error) => {
    toast.warning(error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true
    });
};
const messageSuccess = (error) => {
    toast.success(error, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true
    });
};
async function changePage(page) {
    let books = await getBooks(page, pageSize);
}
let pageSize = 9;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function deleteBook(bookId,setBooks,setOpen) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `https://localhost:7000/api/Books/deleteBook/${bookId}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${document.cookie}`);
    xhr.send(JSON.stringify(bookId));
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            messageSuccess("книга успешно удалилась");
            changePage(1);
            setOpen(!open);
        } else {
            let { error } = JSON.parse(xhr.responseText);
            messageError(error.value);
        }
    };
    await delay(1000);

    let books = await getBooks(1, pageSize);
    setBooks(books);
    setOpen(prevOpen=>!prevOpen);
}