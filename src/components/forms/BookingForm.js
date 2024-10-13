import { CCol, CFormInput, CForm, CFormSwitch } from '@coreui/react'
import DatePicker from 'react-datepicker'

export const BookingForm = ({ onSubmit, onChange, data, handleDateChange }) => {
  return (
    <CForm onSubmit={onSubmit} className="row g-3">
      <CCol md={12}>
        <CFormInput onChange={onChange} value={data.title} name="title" type="text" label="Title" />
      </CCol>
      <CCol md={6}>
        {/* <CFormInput
          onChange={onChange}
          value={data.start}
          name="start"
          type="text"
          label="Start date"
        /> */}
        Start Date
        <DatePicker
          key="startDate"
          selected={data.start}
          onChange={(e) => handleDateChange(e, 'start')} //only when value has changed
          name="startDate"
        />
      </CCol>
      <CCol md={6}>
        End Date
        <DatePicker
          selected={data.end}
          onChange={(e) => handleDateChange(e, 'end')} //only when value has changed
          name="endDate"
        />{' '}
      </CCol>
      <CFormSwitch checked={data.confirmed} onChange={onChange} name="confirm" />
      {/* <CCol md={6}>
        <CFormInput onChange={onChange} value={data.email} name="email" type="text" label="Email" />
      </CCol>
      <CCol md={6}>
        <CFormInput onChange={onChange} value={data.phone} name="phone" type="text" label="Phone" />
      </CCol>
      <CCol md={12}>
        <CFormInput
          onChange={onChange}
          value={data.address}
          name="address"
          type="text"
          label="Address"
        />
      </CCol> */}
    </CForm>
  )
}
