import { CPagination } from '@coreui/react'
import { CPaginationItem } from '@coreui/react'

const ITEMS_PER_PAGE = 10

export const Pagination = ({ total, onPageChange, activePage }) => {
  const pages = Math.ceil(total / ITEMS_PER_PAGE)

  const pageItems = Array.from({ length: pages }, (_, index) => index + 1)
  console.log({ total, pages, activePage })

  const handlePreviousClick = () => {
    if (activePage > 1) {
      onPageChange(--activePage)
    }
  }

  const handleNextClick = () => {
    if (activePage < pages) {
      onPageChange(++activePage)
    }
  }

  const handleClick = (item) => {
    onPageChange(item)
  }

  return (
    <CPagination aria-label="Page navigation example">
      <CPaginationItem disabled={activePage < 2} onClick={handlePreviousClick}>
        Previous
      </CPaginationItem>
      {pageItems.map((item) => {
        return <CPaginationItem onClick={() => handleClick(item)}>{item}</CPaginationItem>
      })}
      <CPaginationItem disabled={activePage >= pages} onClick={handleNextClick}>
        Next
      </CPaginationItem>
    </CPagination>
  )
}
