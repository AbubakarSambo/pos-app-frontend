import {
  CContainer,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CRow,
  CCol,
  CTable,
  CButton,
  CCard,
  CCardBody,
} from '@coreui/react'
import { useEffect, useState } from 'react'
import { getProfile, resetPassword, updateUser } from './services/api'
import { useUserId, useUserRole } from '../../hooks/useUserRole'
import { CreateModal } from '../../components/CreateModal'
import { EditUserForm } from '../../components/forms/EditUserForm'
import { ResetForm } from '../../components/forms/ResetForm'

const Profile = () => {
  const [profile, setProfile] = useState({})
  const userId = useUserId()
  const role = useUserRole()
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [resetModalOpen, setResetModalOpen] = useState(false)

  const [userFormData, setUserFormData] = useState(() => profile)
  const [resetFormData, setResetFormData] = useState({})
  useEffect(() => {
    getProfile(userId).then(({ data }) => {
      setProfile(data)
      setUserFormData(data)
    })
  }, [userId])
  const handleClose = () => {
    setUserModalOpen(false)
  }
  const handleResetClose = () => {
    setResetModalOpen(false)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserFormData({ ...userFormData, [name]: value })
  }
  const handleResetChange = (e) => {
    const { name, value } = e.target
    setResetFormData({ ...resetFormData, [name]: value })
  }
  const handleSubmit = () => {
    updateUser({ ...userFormData }).then(async ({ data }) => {
      setUserFormData({})
      setUserModalOpen(false)
      await localStorage.setItem('resto-app-user', JSON.stringify(data))
    })
  }
  const handleResetSubmit = () => {
    resetPassword({ ...resetFormData, id: userId })
      .then(async ({ data }) => {
        setResetFormData({})
        setResetModalOpen(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <CContainer>
      <CRow className="mb-4">
        <CCol>
          <CButton color="primary" className="px-4" onClick={() => setUserModalOpen(true)}>
            Edit
          </CButton>
          <CButton color="primary" className="px-4 mx-2" onClick={() => setResetModalOpen(true)}>
            Reset
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>First Name: {profile.firstName}</CCol>
            </CRow>
            <CRow>
              <CCol>Last Name: {profile.lastName}</CCol>
            </CRow>
            <CRow>
              <CCol>Phone: {profile.phone}</CCol>
            </CRow>
            <CRow>
              <CCol>Email: {profile.email}</CCol>
            </CRow>
            <CRow>
              <CCol>Role: {role.name}</CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CRow>
      <CreateModal
        visible={userModalOpen}
        title="Edit Menu"
        handleClose={handleClose}
        body={<EditUserForm data={userFormData} onChange={handleChange} onSubmit={handleSubmit} />}
        onSubmit={handleSubmit}
      />
      <CreateModal
        visible={resetModalOpen}
        title="Reset Menu"
        handleClose={handleResetClose}
        body={
          <ResetForm
            data={resetFormData}
            onChange={handleResetChange}
            onSubmit={handleResetSubmit}
          />
        }
        onSubmit={handleResetSubmit}
      />
    </CContainer>
  )
}

export default Profile
