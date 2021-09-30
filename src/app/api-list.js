import axios from 'axios'

const baseURL = 'https://www.googleapis.com/books/v1/volumes'
const api = axios.create({ baseURL })


export const getBook = bookId => api.get(`/${bookId}`)
export const getBooks = (query, orderBy, startIndex) => api.get(`/?q=${query}&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=20`)