// consts
const myLibrary = []
const addBookBtn = document.querySelector('#submit-book');
const bookCards = document.querySelector('#book-cards');
const dialog = document.querySelector('#book-dialog');
const newBookBtn = document.querySelector('#new-book');

// lets


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
    myLibrary.forEach((book) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const title = document.createElement('p');
        title.textContent = book.title;
        const author = document.createElement('p');
        author.textContent = book.author;
        const pages = document.createElement('p');
        pages.textContent = book.pages;
        const read = document.createElement('input');
        read.type = 'checkbox';
        read.checked = book.read;
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        bookCards.appendChild(card);
    });
};

newBookBtn.addEventListener('click', () => dialog.showModal());


addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('#Title').value;
    const author = document.querySelector('#Author').value;
    const pages = document.querySelector('#Pages').value;
    const read = document.querySelector('#Read').checked;
    addBookToLibrary(title, author, pages, read);
    displayBooks();
    dialog.close();
});