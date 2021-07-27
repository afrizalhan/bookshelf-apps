const BELUM_SELESAI_DIBACA_ID = "incompleteBookshelfList";
const UDAH_SELESAI_DIBACA_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

    function makeBook(id /* string */, title, author, year, timestamp /* string */, isCompleted /* boolean */) {

    const textId = document.createElement("h4") ;
    textId.innerText = id;

    const textTitle = document.createElement("h2");
    textTitle.innerText = title;

    const textAuthor = document.createElement("h3");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.innerText = year;

    const textTimestamp = document.createElement("h5");
    textTimestamp.innerText = timestamp;
 
    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textId, textTitle, textAuthor, textYear, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);
    
    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass /* string */, eventListener /* callback function */) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation(); 
    });
    return button;
}

function addBook() {
    const uncompletedBOOKList = document.getElementById(BELUM_SELESAI_DIBACA_ID);
    const textNm = +new Date();
    const textJudul = document.getElementById("inputBookTitle").value;
    const textPenulis = document.getElementById("inputBookAuthor").value;
    const textTahun = document.getElementById("inputBookYear").value;
    const timestamp = document.getElementById("inputBookDate").value;
    
    const book = makeBook(textNm,textJudul,textPenulis,textTahun, timestamp, false);
    const bookObject = composeBookObject(textNm,textJudul,textPenulis,textTahun, timestamp, false);
    
    book[BOOK_ITEMID] = bookObject.id;
    incompleteBookshelfList.push(bookObject);

    uncompletedBOOKList.append(book);
    updateDataToStorage();
}

function addTaskToCompleted(taskElement /* HTMLELement */) {
    const listCompleted = document.getElementById(UDAH_SELESAI_DIBACA_ID);
    const taskId = taskElement.querySelector(".inner > h4").innerText;
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskYear = taskElement.querySelector(".inner > p").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > h5").innerText;

    const newBook = makeBook(taskId, taskTitle, taskAuthor, taskYear, taskTimestamp, true);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement /* HTMLELement */) {
    var r = confirm("Anda Yakin ingin menghapus data?");
    if (r == true) {
        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        incompleteBookshelfList.splice(bookPosition, 1);
    
        taskElement.remove();
        updateDataToStorage();
    }
}

function undoTaskFromCompleted(taskElement /* HTMLELement */){
    const listUncompleted = document.getElementById(BELUM_SELESAI_DIBACA_ID);
    const taskId = taskElement.querySelector(".inner > h4").innerText;
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
    const taskYear = taskElement.querySelector(".inner > p").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > h5").innerText;

    const newBook = makeBook(taskId, taskTitle, taskAuthor, taskYear, taskTimestamp, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function refreshDataFromBook() {
    const listUncompleted = document.getElementById(BELUM_SELESAI_DIBACA_ID);
    let listCompleted = document.getElementById(UDAH_SELESAI_DIBACA_ID);

    for(book of incompleteBookshelfList){
        const newBook = makeBook(book.id, book.title, book.author, book.year, book.timestamp, book.isCompleted);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isCompleted){
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}