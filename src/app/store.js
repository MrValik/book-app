import createSagaMiddleware from '@redux-saga/core'
import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './features/book/bookSlice'
import booksReducer from './features/books/booksSlice'
import rootSaga from './sagas'


const sagaMiddleware = createSagaMiddleware()


const store = configureStore({
  reducer: {
    bookReducer,
    booksReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
      immutableCheck: false
    }).concat(sagaMiddleware)
})


sagaMiddleware.run(rootSaga)

export default store