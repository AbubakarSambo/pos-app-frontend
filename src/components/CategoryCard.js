import React from 'react'
import CIcon from '@coreui/icons-react'
import { CCol } from '@coreui/react'
import { cilPlus } from '@coreui/icons'

export const CategoryCard = (props) => {
  const activeStyle = props.id === props.activeCategory ? 'border border-3 border-secondary' : ''
  return (
    <CCol key={props.id} onClick={() => props.handleClick(props.id)}>
      <div
        className={`cursor-pointer category-hover p-3 bg-primary rounded text-center ${activeStyle}`}
      >
        {props.name}
      </div>
    </CCol>
  )
}

export const NewCategoryCard = (props) => {
  return (
    <CCol onClick={() => props.handleClick()}>
      <div className="cursor-pointer category-hover p-3 bg-info rounded text-center">
        {' '}
        <CIcon icon={cilPlus} height={16} /> Add Category
      </div>
    </CCol>
  )
}
