import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: [],
  loading: false,
  total: 0,
  page: 1,
  query: '',
  orderBy: 'relevance'
}

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    startFetchingBooks(state) {
      return {
        ...state,
        loading: true
      }
    },
    fetchBooksSuccedded(state, { payload }) {
      return {
        ...state,
        ...payload,
        loading: false
      }
    },
    fetchBooksFailed() {
      return {
        ...initialState
      }
    },
    changePage(state, { payload }) {
      return {
        ...state,
        page: payload
      }
    },
    changeQuery(state, { payload }) {
      return {
        ...state,
        query: payload
      }
    },
    changeOrderBy(state, { payload }) {
      return {
        ...state,
        orderBy: payload
      }
    }
  }
})


// Export Actions
export const { 
  startFetchingBooks, fetchBooksSuccedded, changeQuery,
  fetchBooksFailed, changePage, changeOrderBy
} = booksSlice.actions

// Export Reducer
export default booksSlice.reducer