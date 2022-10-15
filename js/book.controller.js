'use strict'

//toDo: add back and forward page button
//toDo: reREad instructions
//toDo: slider onInit
//toDo: work on page button css




function onInit() {
    getLayOut()
    createBooks()
    getBooks()
    renderBooks()
    doTrans()
    var filter = loadFromStorage('filter')
    onSetFilterBy(filter)
    document.querySelector('.filter-price-range').value = filter.price
    document.querySelector('.filter-rating-range').value = filter.rating
}

// render
function renderBooks() {
    var books = getBooks()


    if (isLayoutTable()) {

        var headerStr = `
        <thead class="thead-dark">
          <tr>
            <th onclick="onChangeSort('title')" scope="col" data-trans="title">Title</th>
            <th onclick="onChangeSort('price')" scope="col" data-trans="price">Price</th>
            <th onclick="onChangeSort('rating')" scope="col" data-trans="rating">Rating</th>
            <th scope="col" data-trans="action">Action</th>
            
        </thead>`

        var strHTML = books.shownBooks.map(book =>
            `
        \t<td>${book[gCurrLang]}\t</td>\n
        \t<td>${book.price}₪\t</td>\n
        \t<td>${book.rating}\t</td>\n
        \t<td>
        <div class="btn-group-vertical" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#my-modal" onclick="onRead('${book.id}')" data-trans="read">Read</button>
        <button class="btn btn-warning" onclick="onUpdateBook('${book.id}')" data-trans="update">Update</button>
        <button class="btn btn-danger" onclick="onRemoveBook('${book.id}')" data-trans="delete">Delete</button>
        </div>
        \t</td>\n
        </tr>\n`



        )
        document.querySelector('.content').innerHTML = "<table class='table table-striped'>" + headerStr + strHTML.join('') + "</table>"
    }
    else {
        var strHTML = books.shownBooks.map(book =>
            `<div data-bs-toggle="modal" data-bs-target="#my-modal" class="card" onclick="onRead('${book.id}')">
            <h4>${book[gCurrLang]}</h4>
            <img src="${book.img}"/>
            <h4>${book.price}₪</h4>
            <h4>${book.rating}/10</h4>
            <div class="btn-group duo-btn" role="group" aria-label="Basic example">
            <button class="btn btn-warning" onclick="onUpdateBook('${book.id}')" data-trans="update">Update</button>
            <button class="btn btn-danger" onclick="onRemoveBook('${book.id}')" data-trans="delete">Delete</button>
            
            </div>
            </div>`)
        const elContent = document.querySelector('.content')
        elContent.innerHTML = strHTML.join('')
    }


    renderBtns(books.filteredBooks.length)


}


// crud
function OnAddBook() {
    var el = document.querySelector('[name="el"]').value;
    var price = +document.querySelector('[name="price"]').value;
    var he = +document.querySelector('[name="he"]').value; //required
    addBook(el, he, price)
    renderBooks()
}

function onUpdateBook(id) {

    // input type number min max
    var price = +prompt('name your price!')
    updateBook(id, price)
}

function onRemoveBook(id) {
    removeBook(id)
}


function renderInnerTxt(selector, value) {
    document.querySelector(selector).innerText = value
}
function onRead(id) {
    console.log('on read');
    var book = getBook(id)
    renderInnerTxt('.modal-title', book[gCurrLang])
    renderInnerTxt('.modal-price', book.price + "₪")
    document.querySelector('.modal-rating').innerHTML =
        `<button class="rating" onclick="onChangeRating(-1,'${book.id}')"><</button>
      <h4>${book.rating}</h4>
<button class="rating" onclick="onChangeRating(1,'${book.id}')">></button>`
    // renderInnerTxt('.details-modal-rating', book.rating + "/10")
    document.querySelector('.modalCover').src = book.img
    document.querySelector('.details-modal').classList.add('open')
}
// modal
function onCloseModal() {
    // renderModal
    document.querySelector('.details-modal').classList.remove('open')
}

function onChangeRating(direction, id) {
    changeRating(direction, id)
    var book = getBook(id)
    document.querySelector('.modal-rating').innerHTML =
        `<button class="rating" onclick="onChangeRating(-1,'${book.id}')"><</button>
    <h4>${book.rating}</h4>
<button class="rating" onclick="onChangeRating(1,'${book.id}')">></button>`
    renderBooks()
}
// sort/filter
function onSetFilterBy(filterBy) {
    filterBy = setCarFilter(filterBy)
    document.querySelector('.rating').innerText = filterBy.rating
    document.querySelector('.pricing').innerText = filterBy.price
    renderBooks()

    const queryStringParams = `?price=${filterBy.price}&rating=${filterBy.rating}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}
function onSetFilterByTxt(txt) {
    setFilterByTxt(txt)
    renderBooks()
}
function onChangeSort(sort) {
    changeSort(sort)
    renderBooks()
}
// paging
function onNextPage(direction) {
    var location = nextPage(direction)
    renderBooks()
}
function onChangePage(page) {
    changePage(page)
    renderBooks()
}

function renderBtns(lengthOfBooks) {
    var numOfPages = getNumOfPages(lengthOfBooks)
    var htmlStr = ''
    for (var i = 0; i < numOfPages; i++) {
        htmlStr += `<button class="btn btn-primary" data-btnNum${i} onclick="onChangePage(${i})">${i + 1}</button>`
    }
    document.querySelector('.navButtons').innerHTML =
        `<div class="btn-group" role="group" aria-label="Basic example">
        <button class="btn btn-primary back" onclick="onNextPage(-1)"><</button>
        ${htmlStr}
        <button class="btn btn-primary next" onclick="onNextPage(1)" >></button>
        </div>`

    //change color of current button
    var currentPage = getPage();
    document.querySelector(`[data-btnNum${currentPage} ]`).style.backgroundColor = "rgb(240, 173, 78)"
    if (currentPage === 0) document.querySelector('.back').disabled = true
    if (currentPage === numOfPages - 1) document.querySelector('.next').disabled = true
}

function OnToggleAdd() {
    document.querySelector('.newInput').classList.toggle('hidden')
}


function onChangeLayout() {
    changeLayout()
    renderBooks()
}

function OnOpenModal() {

}

function onSetLang(language) {
    setLang(language)
    renderBooks()
    doTrans()
    if (isLanLtr()) {
        document.querySelector('body').classList.remove('rtl')
    }
    else {
        document.querySelector('body').classList.add('rtl')
    }
}


