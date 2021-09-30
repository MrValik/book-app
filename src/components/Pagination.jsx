import { memo } from 'react'
import Pagination from 'react-responsive-pagination'


const Paginate = ({ currentPage, changePage, total }) => {
  return (
    <Pagination
      current={currentPage}
      total={total}
      onPageChange={changePage}
      maxWidth={350}
    />
  )
}

export default memo(Paginate)