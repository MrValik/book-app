import styled from 'styled-components'
import BookItem from './BookItem'


const CardList = styled.div`
  display: flex;
  padding: 70px 30px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
  gap: 20px;
`


export default function BookList({ books }) {
  return (
    <CardList>
      {books.map(book => {
        return <BookItem key={book?.etag} book={book} />
      })}
    </CardList>
  )
}