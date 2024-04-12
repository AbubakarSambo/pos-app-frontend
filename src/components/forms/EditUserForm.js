import { CCol, CFormInput, CForm, CFormSelect } from '@coreui/react'

export const EditUserForm = ({ onSubmit, onChange, data }) => {
  return (
    <CForm onSubmit={onSubmit} className="row g-3">
      <CCol md={6}>
        <CFormInput
          onChange={onChange}
          value={data.firstName}
          name="firstName"
          type="text"
          label="First Name"
        />
      </CCol>
      <CCol md={6}>
        <CFormInput
          onChange={onChange}
          value={data.lastName}
          name="lastName"
          type="text"
          label="Last Name"
        />
      </CCol>
      <CCol md={6}>
        <CFormInput onChange={onChange} value={data.email} name="email" type="text" label="Email" />
      </CCol>
      <CCol md={6}>
        <CFormInput onChange={onChange} value={data.phone} name="phone" type="text" label="Phone" />
      </CCol>
    </CForm>
  )
}
