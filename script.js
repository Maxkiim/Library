//icons
lucide.createIcons();

// Variables
let myLibrary = [];
const addBookBtn = document.querySelector('#submit-book');
const bookCards = document.querySelector('#book-cards');
const dialog = document.querySelector('#book-dialog');
const newBookBtn = document.querySelector('#new-book');

// Objects
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID()
}

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
        const title = document.createElement('h3');
        title.textContent = book.title;
        const author = document.createElement('p');
        author.classList.add('author');
        author.textContent = book.author;
        const pages = document.createElement('p');
        pages.textContent = 'Pages:' + book.pages;
        // Create a toggle button that shows if the book was read
        const readBook = document.createElement('button');
        readBook.textContent =  book.read ? 'Read' : 'Not Read';
        readBook.addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });
        const removeBook = document.createElement('button');
        // Create a remove book card on each created book card
        removeBook.classList.add('remove-btn');
        removeBook.textContent = 'Remove Book';
        card.dataset.id = book.id //give each book card an id to then identify which card to delete
        // Give functionality to the Remove Card btn
        removeBook.addEventListener('click', () => {
            myLibrary = myLibrary.filter(book => book.id !== card.dataset.id);
            displayBooks();
        })
        // Appending and Creating book card
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readBook);
        card.appendChild(removeBook);
        bookCards.appendChild(card);
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