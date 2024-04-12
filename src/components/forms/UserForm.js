import { CCol, CFormInput, CForm, CFormSelect } from '@coreui/react'

export const UserForm = ({ onSubmit, onChange, data, roles }) => {
  const rolesData =
    roles &&
    roles.map((role) => ({
      label: role.name,
      value: role.id,
    }))
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
      <CCol md={12}>
        <CFormSelect
          name="roleId"
          value={data.roleId}
          aria-label="Default select example"
          options={rolesData}
          onChange={onChange}
          label="Select Role"
        />
      </CCol>
    </CForm>
  )
}
