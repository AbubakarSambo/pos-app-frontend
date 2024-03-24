import { useState } from 'react'
import { CFormSelect, CCol, CFormInput, CButton, CForm } from '@coreui/react'

export const MenuForm = ({ onSubmit, onChange, data, categories }) => {
  const categoriesData =
    categories &&
    categories.map((cat) => ({
      label: cat.name,
      value: cat.id,
    }))
  console.log({ data, categoriesData })
  return (
    <CForm onSubmit={onSubmit} className="row g-3">
      <CCol md={6}>
        <CFormInput onChange={onChange} value={data.name} name="name" type="text" label="Name" />
      </CCol>
      <CCol md={6}>
        <CFormInput onChange={onChange} value={data.price} name="price" type="text" label="Price" />
      </CCol>
      <CCol md={12}>
        <CFormInput
          onChange={onChange}
          value={data.description}
          name="description"
          type="text"
          label="Description"
        />
      </CCol>
      <CCol md={12}>
        <CFormSelect
          name="categoryId"
          value={data.categoryId}
          aria-label="Default select example"
          options={categoriesData}
          onChange={onChange}
        />
      </CCol>
    </CForm>
  )
}
