import { CCol, CFormInput, CForm, CFormSelect } from '@coreui/react'

export const ResetForm = ({ onSubmit, onChange, data }) => {
  return (
    <CForm onSubmit={onSubmit} className="row g-3">
      <CCol md={12}>
        <CFormInput
          onChange={onChange}
          value={data.oldPassword}
          name="oldPassword"
          type="password"
          label="Old Password"
        />
      </CCol>
      <CCol md={12}>
        <CFormInput
          onChange={onChange}
          value={data.newPassword}
          name="newPassword"
          type="password"
          label="New Password"
        />
      </CCol>
    </CForm>
  )
}
