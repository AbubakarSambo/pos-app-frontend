import { useState } from 'react'
import { CRow, CCol, CFormInput, CButton, CForm } from '@coreui/react'

export const CategoryForm = ({ onSubmit, onChange, data }) => {
  return (
    <CForm onSubmit={onSubmit} className="row g-3">
      <CCol md={12}>
        <CFormInput
          onChange={onChange}
          value={data.category}
          name="category"
          type="text"
          label="Category"
        />
      </CCol>
    </CForm>
  )
}
