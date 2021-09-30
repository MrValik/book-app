import { useHistory } from 'react-router-dom'
import styled from 'styled-components'


const Card = styled.div`
  position: relative;
  width: 250px;
  height: 280px;
  overflow: hidden;
  border-radius: 12px;
  background: #fff;
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border: none;
`

const CardBody = styled.div`
  position: absolute;
  width: 100%;
  background: #34344d;
  height: 280px;
  color: #fff;
  overflow: auto;
  transform: translateY(280px);
  transition: all 0.5s ease-in-out !important;
`

const CardTitle = styled.h4`
  font: 600 1.4em Georgia;
  padding: 12px;
  text-align: center;
`


export default function BookItem({ book }) {
  const { title, authors, categories, pageCount, publishedDate, publisher } = book?.volumeInfo
  const history = useHistory()


  return (
    <Card className="shadow border border-secondary card" onClick={() => history.push(`/${book?.id}`)}>

      <CardImage 
        src={book?.volumeInfo?.imageLinks?.thumbnail || './images/default.jpeg'}
        className="border-bottom" 
        alt={book?.volumeInfo?.subtitle}
      />
      <CardBody 
        className="card-body"
      >
        <CardTitle>{title}</CardTitle>
        {categories?.length ? <p><b>Categories:</b> {categories?.join(', ')}</p> : ''}
        {authors?.length ? <p><b>Authors:</b> {authors?.join(', ')}</p> : ''}
        {pageCount ? <p><b>Page count:</b> {pageCount}</p> : ''}
        {publishedDate ? <p><b>Published Date:</b> {publishedDate}</p> : ''}
        {publisher ? <p><b>Publisher:</b> {publisher}</p> : ''}
      </CardBody>
    </Card>
  )
}