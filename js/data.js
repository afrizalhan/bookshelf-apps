const STORAGE_KEY = "BOOK_APPS";

let incompleteBookshelfList = [];


 function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}


function saveData() {
    const parsed = JSON.stringify(incompleteBookshelfList);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

/**
 * Fungsi ini digunakan untuk memuat data dari localStorage
 * Dan memasukkan data hasil parsing ke variabel {@see incompleteBookshelfList}
 */
function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
    incompleteBookshelfList = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function composeBookObject(id,title, author, year, timestamp, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        timestamp,
        isCompleted
    };
}

function findBook(bookId) {

    for(book of incompleteBookshelfList){
        if(book.id === bookId)
            return book;
    }

    return null;
}

function findBookIndex(bookId) {
    
    let index = 0
    for (book of incompleteBookshelfList) {
        if(book.id === bookId)
            return index;

        index++;
    }

    return -1;
}