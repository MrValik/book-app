import { takeEvery, put, call} from 'redux-saga/effects'
import * as API from './api-list'
import { REQUEST_BOOK, REQUEST_BOOKS } from './actions'
import { fetchBooksFailed, fetchBooksSuccedded, startFetchingBooks } from './features/books/booksSlice'
import { fetchBookFailed, fetchBookSuccedded, startFetchingBook } from './features/book/bookSlice'


async function fetchBook({ bookId }) {
  try {
    const { data } = await API.getBook(bookId)
    return data
  } catch(e) {
    throw e
  }
}


async function fetchBooks({ query, orderBy, startIndex }) {
  try {
    const { data } = await API.getBooks(query, orderBy, startIndex)
    return data
  }
  catch(e) {
    throw e
  }
}


function* sagaWorkerFetchBook({ payload }) {
  yield put(startFetchingBook())

  try {
    const result = yield call(fetchBook, payload)
    yield put(fetchBookSuccedded(result?.volumeInfo))
  }
  catch(e) {
    yield put(fetchBookFailed())
  }
}



function* sagaWorkerFetchBooks({ payload }) {
  yield put(startFetchingBooks())

  try {
    const result = yield call(fetchBooks, payload)
    yield put(fetchBooksSuccedded({ books: result?.items, total: Math.ceil(result?.totalItems / 20) }))
  }
  catch(e) {
    yield put(fetchBooksFailed())
  }
}


export default function* sagaWatcher() {
  yield takeEvery(REQUEST_BOOK, sagaWorkerFetchBook)
  yield takeEvery(REQUEST_BOOKS, sagaWorkerFetchBooks)
}