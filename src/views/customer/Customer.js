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
import { CustomerForm } from '../../components/forms/CustomerForm'
import { deleteCustomer, saveCustomer, updateCustomer } from './services/api'

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
    key: 'address',
    label: 'Address',
    _props: { scope: 'col' },
  },
  {
    key: 'phone',
    label: 'Phone',
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
  { key: 'action', label: 'Action' },
]

const Customer = () => {
  const [customers, setCustomers] = useState({ data: [], total: null })
  const [formattedTableData, setFormattedTableData] = useState([])
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [isInEditMode, setIsInEditMode] = useState(false)

  const [filterParams, setFilterParams] = useState({
    skip: 0,
    take: ITEMS_PER_PAGE,
  })
  const [activePage, setActivePage] = useState(1)
  const [customerFormData, setCustomerFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  })

  useEffect(() => {
    genericFetch('/customers', filterParams).then(({ data }) => {
      setCustomers(data)
    })
  }, [filterParams])

  useEffect(() => {
    if (customers.data.length > 0) {
      const formattedData = customers.data.map((cat) => {
        return {
          firstName: cat.firstName,
          lastName: cat.lastName,
          email: cat.email,
          address: cat.address,
          phone: cat.phone,
          action: (
            <CDropdown placement="bottom-end">
              <CDropdownToggle custom color="secondary">
                <CIcon icon={cilSettings} className="me-2 cursor-pointer" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleEdit(cat)}>Edit</CDropdownItem>
                <CDropdownItem onClick={() => handleDelete(cat)}>Delete</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          ),
        }
      })
      setFormattedTableData(formattedData)
    }
  }, [customers])

  const handlePageChange = (params) => {
    setActivePage(params)
    setFilterParams({
      skip: (params - 1) * ITEMS_PER_PAGE,
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setCustomerFormData({ ...customerFormData, [name]: value })
  }
  const handleSubmit = () => {
    if (!isInEditMode) {
      saveCustomer(customerFormData).then(({ data }) => {
        setCustomerFormData({})
        setCustomerModalOpen(false)
        setCustomers({ ...customers, data: [...customers.data, data] })
      })
    } else {
      updateCustomer({ ...customerFormData, name: customerFormData.category }).then(({ data }) => {
        setCustomerFormData({})
        setCustomerModalOpen(false)
        const updatedCategories = customers.data.map((cat) => {
          return cat.id === data.id ? { ...data } : cat
        })
        setCustomers({ ...customers, data: updatedCategories })
      })
    }
  }
  const handleClose = () => {
    setCustomerFormData({})
    setCustomerModalOpen(false)
  }

  const handleEdit = (customer) => {
    const categoryToEdit = customers.data.find((cat) => cat.id === customer.id)
    setIsInEditMode(true)

    setCustomerFormData({ ...categoryToEdit, category: categoryToEdit.name })
    setCustomerModalOpen(true)
  }
  const handleDelete = (customer) => {
    deleteCustomer(customer.id).then(() => {
      const updatedCategories = customers.data.filter((cat) => {
        return cat.id !== customer.id
      })

      setCustomers({
        ...customers,
        data: updatedCategories,
        total: customers.total - 1,
      })
    })
  }

  return (
    <>
      <CContainer>
        <CRow className="mb-2 justify-content-end">
          <CCol sm={2}>
            <CButton color="primary" className="px-4" onClick={() => setCustomerModalOpen(true)}>
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
        <Pagination
          total={customers.total}
          onPageChange={handlePageChange}
          activePage={activePage}
        />
      </CContainer>

      <CreateModal
        visible={customerModalOpen}
        title="Create Menu"
        handleClose={handleClose}
        body={
          <CustomerForm data={customerFormData} onChange={handleChange} onSubmit={handleSubmit} />
        }
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default Customer
