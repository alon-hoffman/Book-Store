'use strict';

var gCurrLang = 'en'
const gTrans = {
    'book-store': {
        en: 'Book Store',
        he: 'חנות ספרים'
    },
    'max-price': {
        en: 'Max Price: ',
        he: 'מחיר מקסימלי: '
    },
    'min-rating': {
        en: 'Min Rating: ',
        he: 'דירוג מינימאלי: '
    },
    'type-something': {
        en: 'Type something',
        he: 'הקלד/י'
    },
    'toggle-layout': {
        en: 'Toggle Layout',
        he: 'שנה/י תצוגה'
    },
    'add-book': {
        en: 'Add Book',
        he: 'הוספת ספר'
    },
    'title': {
        en: 'Title',
        he: 'שם'
    },
    'price': {
        en: 'Price',
        he: 'מחיר'
    },
    'rating': {
        en: 'Rating',
        he: 'דירוג'
    },
    'action': {
        en: 'Action',
        he: 'פעולה'
    },
    'read': {
        en: 'Read',
        he: 'קראו עוד'
    },
    'update': {
        en: 'Update',
        he: 'עדכון מחיר'
    },
    'delete': {
        en: 'Delete',
        he: 'מחיקה'
    },
    '>': {
        en: '>',
        he: '<'
    },
    '<': {
        en: '<',
        he: '>'
    }

}

const ltrLangs = ['en']


function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function setLang(language) {
    gCurrLang = language
}

function isLanLtr() {
    return (ltrLangs.findIndex((lang) => lang === gCurrLang) !== -1)
}

