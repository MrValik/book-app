import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import BookList from '../components/BookList'
import Pagination from '../components/Pagination'
import { REQUEST_BOOKS } from '../app/actions'
import { changePage, changeQuery, changeOrderBy } from '../app/features/books/booksSlice'
import Loader from '../components/Loader'


const Header = styled.header`
  width: 100%;
  height: 450px;
  background-size: cover;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background: url('./images/photo.jpeg') center no-repeat !important;
  background-size: 100% 100% !important;
`

const Title = styled.h1`
  font: 600 4.2em Georgia;
  text-align: center;
  color: #e9ecef;
  text-shadow: 1px 1px 3px #000;
`

const Form = styled.form`
  padding: 0 20px;
  display: flex;
  gap: 10px;
`

const Button = styled.button`
  width: 70px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Select = styled.select`
  height: 45px;
  margin-right: 1px;
`

const Input = styled.input`
  height: 45px;
`

const Svg = styled.svg`
  width: 20px;
  height: 20px;
`

const Main = styled.main`
  position: relative;
  padding-bottom: 25px;
  min-height: 300px;
  background: rgba(68, 66, 66, 0.1);
`

const NoData = styled.h5`
  position: absolute;
  top: 50%;
  left: 42%;
`


export default function Books() {
  const dispatch = useDispatch()
  const { books, total, page, orderBy, query, loading } = useSelector(state => state.booksReducer)


  const handleChangePage = currentPage => {
    dispatch(changePage(currentPage))
    dispatch({ type: REQUEST_BOOKS, payload: { query, orderBy, startIndex: (currentPage - 1) * 20 } })
  }


  const handleSearch = e => {
    e.preventDefault()
    dispatch({ type: REQUEST_BOOKS, payload: { query, orderBy, startIndex: 0 } })
    dispatch(changePage(1))
  }


  return (
    <>
      {loading ? <Loader /> : ''}
      <Header>
        <Title>Google Books</Title>
        <Form onSubmit={handleSearch}>
          <div className="input-group">
            <div className="input-group-prepend">
              <Select 
                value={orderBy}
                className="custom-select"
                onChange={e => dispatch(changeOrderBy(e.target.value))}
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
              </Select>
            </div>
            <Input 
              type="search" 
              value={query}
              onChange={e => dispatch(changeQuery(e.target.value))}
              className="form-control" 
              placeholder="Search" 
              required
            />
          </div>

          <Button 
            type="submit"
            className="btn btn-primary"
          >
            <Svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </Svg>
          </Button>
        </Form>
      </Header>

      <Main>
        {
          books?.length ? (
            <>
              <BookList books={books} />
              <Pagination
                currentPage={page}
                changePage={handleChangePage}
                total={total}
              />
            </>
          ) : <NoData className="text-danger noData">No data</NoData>
        }
      </Main>
    </>
  )
}