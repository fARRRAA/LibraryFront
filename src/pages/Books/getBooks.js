
export async function getBooks(page, pageSize) {
    let response = await fetch(`https://localhost:7000/api/Books/getAllBooks?page=${page}&pageSize=${pageSize}`, {
        method: "GET",
        headers: {
            "Authorization": document.cookie
        }
    });
    
    if (response.status >= 200 && response.status <= 300) {
        let data = await response.json();
        return data.books;
    }
    return []; 
}

async function getAllBooks() {
    let response = await fetch(`https://localhost:7000/api/Books/getAllBooks`, {
        method: "GET",
        headers: {
            "Authorization": document.cookie
        }
    });
    
    if (response.status >= 200 && response.status <= 300) {
        let data = await response.json();
        return data.books.length;
    }
    return 0; 
}

export const booksCount = await getAllBooks();