import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
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
} from '@coreui/react'
import { genericFetch } from '../../services/api'
import { cilSettings } from '@coreui/icons'
import { Pagination } from '../../components/Pagination'
import { CreateModal } from '../../components/CreateModal'
// import { saveCategory } from '../menu/services/api'
import { deleteUser, saveUser, updateUser } from './services/api'
import { UserForm } from '../../components/forms/UserForm'
import { useUserOrg } from '../../hooks/useUserRole'

const ITEMS_PER_PAGE = 10

const columns = [
  {
    key: 'firstName',
    label: 'First Name',
    _props: { scope: 'col' },
  },
  {
    key: 'lastName',
    label: 'Last Name',
    _props: { scope: 'col' },
  },
  {
    key: 'email',
    label: 'Email',
    _props: { scope: 'col' },
  },
  {
    key: 'phone',
    label: 'Phone',
    _props: { scope: 'col' },
  },
  {
    key: 'role',
    label: 'Role',
    _props: { scope: 'col' },
  },

  {
    key: 'action',
    label: 'Action',
    _props: { scope: 'col' },
  },
]
const fields = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Address' },
  { key: 'phone', label: 'Phone' },
  { key: 'role', label: 'Role' },
  { key: 'action', label: 'Action' },
]

const Customer = () => {
  const [users, setUsers] = useState({ data: [], total: null })
  const [roles, setRoles] = useState([])
  const [formattedTableData, setFormattedTableData] = useState([])
  const [userModalOpen, setUserModalOpen] = useState(false)
  const [isInEditMode, setIsInEditMode] = useState(false)
  const orgId = useUserOrg()
  const [filterParams, setFilterParams] = useState({
    skip: 0,
    take: ITEMS_PER_PAGE,
  })
  const [activePage, setActivePage] = useState(1)
  const [userFormData, setUserFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    genericFetch('/users', filterParams).then(({ data }) => {
      setUsers(data)
    })
    genericFetch('/roles', { take: 100 }).then(({ data }) => {
      setRoles(data)
    })
  }, [filterParams])

  useEffect(() => {
    if (users.data.length > 0) {
      const formattedData = users.data.map((user) => {
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role.name,
          action: (
            <CDropdown placement="bottom-end">
              <CDropdownToggle custom color="secondary">
                <CIcon icon={cilSettings} className="me-2 cursor-pointer" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleEdit(user)}>Edit</CDropdownItem>
                <CDropdownItem onClick={() => handleDelete(user)}>Delete</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          ),
        }
      })
      setFormattedTableData(formattedData)
    }
  }, [users])

  const handlePageChange = (params) => {
    setActivePage(params)
    setFilterParams({
      skip: (params - 1) * ITEMS_PER_PAGE,
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserFormData({ ...userFormData, [name]: value })
  }
  const handleSubmit = () => {
    if (!isInEditMode) {
      userFormData.orgId = orgId
      saveUser(userFormData).then(({ data }) => {
        setUserFormData({})
        setUserModalOpen(false)
        setUsers({ ...users, data: [...users.data, data] })
      })
    } else {
      updateUser({ ...userFormData }).then(({ data }) => {
        setUserFormData({})
        setUserModalOpen(false)
        const updatedUsers = users.data.map((cat) => {
          return cat.id === data.id ? { ...data } : cat
        })
        setUsers({ ...users, data: updatedUsers })
      })
    }
  }
  const handleClose = () => {
    setUserFormData({})
    setUserModalOpen(false)
  }

  const handleEdit = (customer) => {
    const userToEdit = users.data.find((cat) => cat.id === customer.id)
    setIsInEditMode(true)

    setUserFormData({ ...userToEdit })
    setUserModalOpen(true)
  }
  const handleDelete = (customer) => {
    deleteUser(customer.id).then(() => {
      const updatedUsers = users.data.filter((cat) => {
        return cat.id !== customer.id
      })

      setUsers({
        ...users,
        data: updatedUsers,
        total: users.total - 1,
      })
    })
  }
  return (
    <>
      <CContainer>
        <CRow className="mb-2 justify-content-end">
          <CCol sm={2}>
            <CButton color="primary" className="px-4" onClick={() => setUserModalOpen(true)}>
              Create
            </CButton>
          </CCol>
        </CRow>
        <CTable
          items={formattedTableData}
          columns={columns}
          fields={fields}
          hover
          striped
          bordered
          size="sm"
        />
        <Pagination total={users.total} onPageChange={handlePageChange} activePage={activePage} />
      </CContainer>

      <CreateModal
        visible={userModalOpen}
        title="Create Menu"
        handleClose={handleClose}
        body={
          <UserForm
            data={userFormData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            roles={roles}
          />
        }
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default Customer
