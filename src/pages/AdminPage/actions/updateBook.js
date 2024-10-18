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
    return books;
}
let pageSize = 9;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function updateBook(id,bookObj,setBooks,setOpen){
    if (bookObj.Author.length === 0 || bookObj.Id_Genre.valueOf == 0 || bookObj.Title.length == 0 || bookObj.Year.length === 0 || bookObj.Description.length == 0) {
        return messageError("fill in all fields");
    }
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `https://localhost:7000/api/Books/updateBook/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${document.cookie}`);
    xhr.send(JSON.stringify(bookObj));
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            messageSuccess("книга успешно обновлена");

        } else {
            let { error } = JSON.parse(xhr.responseText);
            messageError(error.value);
        }
    };
    await delay(1000);
    let books = await changePage(1);
    await setBooks(books);
    setOpen(prevOpen=>!prevOpen);

}

// await getBooks(1, pageSize);