'use strict';



var filteredBooks

const PAGE_SIZE = 7

var gPageIdx = 0

var gFilterBy = { price: 200, rating: 0, txt: '' }
var filterBy = gFilterBy
var gSortBy = "rating"
var gLayout

var gBooks



function getBooks() {
    var preFilterBooks = gBooks

    filteredBooks = preFilterBooks.filter(book => book.price <= filterBy.price
        && book.rating >= filterBy.rating &&
        book[gCurrLang].toLowerCase().includes(filterBy.txt.toLowerCase())
    )

    switch (gSortBy) {
        case "rating":
            filteredBooks.sort((book1, book2) => book2.rating - book1.rating)
            break;
        case "price":
            filteredBooks.sort((book1, book2) => book1.price - book2.price)
            break;
        case "title":
            filteredBooks.sort((book1, book2) => book1[gCurrLang].localeCompare(book2[gCurrLang]))
        default:
            break;
    }

    const startIdx = gPageIdx * PAGE_SIZE
    var shownBooks = filteredBooks.slice(startIdx, startIdx + PAGE_SIZE)


    return { shownBooks, filteredBooks }
}

function addBook(el, he, price) {
    const newBook = _createBook(el, he, +0, price)
    gBooks.unshift(newBook)
    saveToStorage('books', gBooks)
}

function updateBook(id, price) {
    const bookToUpdate = gBooks.find(book => id === book.id)
    bookToUpdate.price = price
    saveToStorage('books', gBooks)
    renderBooks()
}

function removeBook(id) {
    const BookIdx = gBooks.findIndex(book => id === book.id)
    gBooks.splice(BookIdx, 1)
    saveToStorage('books', gBooks)
    renderBooks()
}



function setCarFilter(filterBy = {}) {
    if (filterBy.price !== undefined) gFilterBy.price = filterBy.price
    if (filterBy.rating !== undefined) gFilterBy.rating = filterBy.rating
    saveToStorage('filter', gFilterBy)
    return gFilterBy
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function getBook(id) {
    return gBooks.find(book => id == book.id)
}

function changeRating(direction, id) {
    const bookToChange = gBooks.find(book => book.id === id)

    if (bookToChange.rating + direction > 10 || bookToChange.rating + direction < 1) return
    bookToChange.rating = bookToChange.rating * 1 + direction
    saveToStorage('books', gBooks)
}


function setFilterByTxt(txt) {
    gFilterBy.txt = txt
    saveToStorage('filter', gFilterBy)
}

function nextPage(direction) {
    gPageIdx += direction
    if (gPageIdx * PAGE_SIZE >= filteredBooks.length) {
        gPageIdx = 0
    }
}

function getNumOfPages(lengthOfBooks) {
    return Math.ceil(lengthOfBooks / PAGE_SIZE)
}

function changePage(page) {
    gPageIdx = page
}

function changeSort(sort) {
    gSortBy = sort
}


function changeLayout() {
    if (gLayout === "table") gLayout = "cards"
    else gLayout = "table"
    saveToStorage('favLayout', gLayout)
}

function isLayoutTable() {
    return gLayout === "table"
}

function getLayOut() {
    gLayout = loadFromStorage('favLayout')
    if (!gLayout || !gLayout.length) {
        gLayout = "cards"
        saveToStorage('favLayout', "cards")
    }
}

function createBooks() {
    gBooks = loadFromStorage('books') || [];
    if (!gBooks || !gBooks.length) {
        gBooks.push(
            _createBook("Harry Potter", "הארי פוטר", 10, 70),
            _createBook("Bunny", "ארנבוני", 2, 10),
            _createBook("Long Walk", " ההליכה הארוכה", 8, 90),
            _createBook("Secret", "סוד", 10, 70),
            _createBook("Pray", "תפילה", 2, 10),
            _createBook("Sleep", "שינה", 8, 90),
            _createBook("Harry Potter", "הארי פוטר", 10, 70),
            _createBook("Bunny", "ארנבוני", 2, 10),
            _createBook("Long Walk", " ההליכה הארוכה", 8, 90),
            _createBook("Secret", "סוד", 10, 70),
            _createBook("Pray", "תפילה", 2, 10),
            _createBook("Sleep", "שינה", 8, 90)
        );
    }
    saveToStorage('books', gBooks);
}

function _createBook(en, he, rating, price) {
    return {
        id: makeId(),
        en,
        he,
        rating,
        price,
        img: "images/" + getRandomIntInclusive(1, 5) + ".jpg"
    };
}

function getPage() {
    return gPageIdx
}
