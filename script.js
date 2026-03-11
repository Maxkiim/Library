// Variables
let myLibrary = [];
const addBookBtn = document.querySelector('#submit-book');
const bookCards = document.querySelector('#book-cards');
const dialog = document.querySelector('#book-dialog');
const newBookBtn = document.querySelector('#new-book');

// class for Book 

class Book {
    constructor(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.id = crypto.randomUUID()
    }
}

// call the class
// Objects
// function Book(title, author, pages, read){
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.id = crypto.randomUUID()
// }

// Functions

function addBookToLibrary(title, author, pages, read){
    // take params, create a book then store it in the array
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}

function displayBooks(){
    bookCards.innerHTML = '';
    myLibrary.forEach((book) => {
        // Create Book Information Card
        const card = document.createElement('div');
        card.classList.add('card');
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');
        const removeBtnDiv = document.createElement('div');
        removeBtnDiv.classList.add('remove-card');
        const title = document.createElement('h3');
        title.textContent = book.title;
        const author = document.createElement('p');
        author.classList.add('author');
        author.textContent = 'by ' + book.author;
        const pagesBox = document.createElement('div');
        const pages = document.createElement('h5');
        pagesBox.classList.add('pagesBox');
        pages.textContent = 'Pages:';
        const pagesNum = document.createElement('p');
        pagesNum.textContent = book.pages;
        pagesBox.appendChild(pages);
        pagesBox.appendChild(pagesNum);
        // Create a toggle button that shows if the book was read
        const readBox = document.createElement('div');
        readBox.classList.add('readBox');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = book.read;
        const readStatus = document.createElement('p');
        readStatus.textContent = book.read ? 'Read' : 'Not read yet';
        checkbox.addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });
        readBox.appendChild(checkbox)
        readBox.appendChild(readStatus)
        // Create a remove book card button on each created book card
        const removeDiv = document.createElement('div');
        removeDiv.classList.add('remove-card');
        const removeBook = document.createElement('button');
        removeBook.classList.add('remove-btn');
        removeBook.innerHTML = '<i data-lucide="trash-2"></i>';
        card.dataset.id = book.id //give each book card an id to then identify which card to delete
        // Give functionality to the Remove Card btn
        removeBook.addEventListener('click', () => {
            myLibrary = myLibrary.filter(book => book.id !== card.dataset.id);
            displayBooks();
        })
        // Appending and Creating book card
        cardInfo.appendChild(title);
        cardInfo.appendChild(author);
        cardInfo.appendChild(pagesBox);
        cardInfo.appendChild(readBox);
        removeDiv.appendChild(removeBook);
        card.appendChild(cardInfo);
        card.appendChild(removeDiv);
        bookCards.appendChild(card);
        lucide.createIcons();
    });
};
function toggleDisplay(){
    dialog.classList.toggle('hidden');
    newBookBtn.classList.toggle('hidden');
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

newBookBtn.addEventListener('click', () => toggleDisplay());

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevents the submit btn to send data to a server and refreshing
    const title = document.querySelector('#Title').value;
    const author = document.querySelector('#Author').value;
    const pages = document.querySelector('#Pages').value;
    const read = document.querySelector('#Read').checked;
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    toggleDisplay();
    // Reset the form so its empty when adding new book
    document.querySelector('#Title').value = '';
    document.querySelector('#Author').value = '';
    document.querySelector('#Pages').value = '';
    document.querySelector('#Read').checked = false;
});


//icons
lucide.createIcons();