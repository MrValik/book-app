import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { REQUEST_BOOK } from '../app/actions'
import Loader from '../components/Loader'


const Main = styled.main`
  background: rgba(45, 99, 153, 0.1);
  padding: 30px 0;
`

const Button = styled.button`
  margin: 0 auto;
  min-width: 120px;
  height: 42px;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const Svg = styled.svg`
  width: 24px;
  height: 24px;
`

const BookDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 20px 0 0;
`

const Image = styled.img`
  min-width: 300px;
  max-width: 400px;
  min-height: 300px;
  max-height: 400px;
`

const BookTitle = styled.h2`
  font: 600 35px Georgia;
  text-align: center;
  white-spacing: pre-wrap;
`

const BookSubTitle = styled.h3`
  font: 500 24px Georgia;
  text-align: center;
  white-spacing: pre-wrap;
`


export default function BookPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const { book, loading } = useSelector(state => state.bookReducer)

  
  useEffect(() => {
    dispatch({ type: REQUEST_BOOK, payload: { bookId: params?.bookId }})
  }, [dispatch, params])


  return (
    <>
      {loading ? <Loader /> : ''}
      <Main>
        <Button 
          className="btn btn-dark shadow"
          onClick={() => history.push('/')}
        >
          <Svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-circle-left" className="svg-inline--fa fa-chevron-circle-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"></path>
          </Svg>
          <span>Go Back</span>
        </Button>
        
        <br />

        <BookDetails>
          <Image
            src={book?.imageLinks?.thumbnail || './images/default.jpeg'}
            alt={book?.title}
            className="shadow rounded border"
          />

          <div className="container">
            {book?.title ? <BookTitle>{book?.title}</BookTitle> : ''}
            {book?.subtitle ? <BookSubTitle>{book?.subtitle}</BookSubTitle> : ''}
            {book?.description ? <div>{book?.description}</div> : ''}
            <br />
            {book?.publishedDate ? <p><b>Published Date: </b> {book?.publishedDate}</p> : ''}
            {book?.publisher ? <p><b>Publisher: </b> {book?.publisher}</p> : ''}
            {book?.authors?.length ? <p><b>Authors: </b> {book?.authors.join(', ')}</p> : ''}
            {book?.categories?.length ? <p><b>Categories: </b> {book?.categories.join(', ')}</p> : ''}
            {book?.pageCount ? <p><b>Page Count: </b> {book?.pageCount}</p> : ''}
            {book?.previewLink ? <p><b>Preview Link: </b> <a href={book?.previewLink} rel="noreferrer" target="_blank">{book?.previewLink}</a></p> : ''}
            {book?.infoLink ? <p><b>Info Link: </b> <a href={book?.infoLink} rel="noreferrer" target="_blank">{book?.infoLink}</a></p> : ''}
          </div>
        </BookDetails>
      </Main>
    </>
  )
}