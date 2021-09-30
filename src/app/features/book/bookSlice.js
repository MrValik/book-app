import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  book: {},
  loading: false
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    startFetchingBook(state) {
      return {
        ...state,
        loading: true
      }
    },
    fetchBookSuccedded(state, { payload }) {
      return {
        ...state,
        book: payload,
        loading: false
      }
    },
    fetchBookFailed() {
      return {
        ...initialState
      }
    }
  }
})


// Export Actions
export const { startFetchingBook, fetchBookSuccedded, fetchBookFailed } = bookSlice.actions

// Export Reducer
export default bookSlice.reducer