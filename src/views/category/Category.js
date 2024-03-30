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
import { CategoryForm } from '../../components/forms/CategoryForm'
import { saveCategory } from '../menu/services/api'
import { deleteCategory, updateCategory } from './services/api'

const ITEMS_PER_PAGE = 10

const columns = [
  {
    key: 'name',
    label: 'Name',
    _props: { scope: 'col' },
  },
  {
    key: 'action',
    label: 'Action',
    _props: { scope: 'col' },
  },
]
const fields = [
  { key: 'name', label: 'Name' },
  { key: 'action', label: 'Action' },
]

const Category = () => {
  const [categories, setCategories] = useState({ data: [], total: null })
  const [formattedTableData, setFormattedTableData] = useState([])
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [isInEditMode, setIsInEditMode] = useState(false)

  const [filterParams, setFilterParams] = useState({
    skip: 0,
    take: ITEMS_PER_PAGE,
  })
  const [activePage, setActivePage] = useState(1)
  const [categoryFormData, setCategoryFormData] = useState({ category: '' })

  useEffect(() => {
    genericFetch('/categories', filterParams).then(({ data }) => {
      setCategories(data)
    })
  }, [filterParams])

  useEffect(() => {
    if (categories.data.length > 0) {
      const formattedData = categories.data.map((cat) => {
        return {
          name: cat.name,
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
  }, [categories])

  const handlePageChange = (params) => {
    setActivePage(params)
    setFilterParams({
      skip: (params - 1) * ITEMS_PER_PAGE,
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setCategoryFormData({ ...categoryFormData, [name]: value })
  }
  const handleSubmit = () => {
    if (!isInEditMode) {
      const data = {
        name: categoryFormData.category,
      }
      saveCategory(data).then(({ data }) => {
        setCategoryFormData({})
        setCategoryModalOpen(false)
        setCategories({ ...categories, data: [...categories.data, data] })
      })
    } else {
      updateCategory({ ...categoryFormData, name: categoryFormData.category }).then(({ data }) => {
        setCategoryFormData({})
        setCategoryModalOpen(false)
        console.log({ data })
        const updatedCategories = categories.data.map((cat) => {
          return cat.id === data.id ? { ...data } : cat
        })
        setCategories({ ...categories, data: updatedCategories })
      })
    }
  }
  const handleClose = () => {
    setCategoryFormData({ category: '' })
    setCategoryModalOpen(false)
  }

  const handleEdit = (category) => {
    const categoryToEdit = categories.data.find((cat) => cat.id === category.id)
    setIsInEditMode(true)
    console.log(categoryToEdit)

    setCategoryFormData({ ...categoryToEdit, category: categoryToEdit.name })
    setCategoryModalOpen(true)
  }
  const handleDelete = (category) => {
    console.log({ category })
    deleteCategory(category.id).then(() => {
      const updatedCategories = categories.data.filter((cat) => {
        return cat.id !== category.id
      })

      setCategories({
        ...categories,
        data: updatedCategories,
        total: categories.total - 1,
      })
    })
  }
  return (
    <>
      <CContainer>
        <CRow className="mb-2 justify-content-end">
          <CCol sm={2}>
            <CButton color="primary" className="px-4" onClick={() => setCategoryModalOpen(true)}>
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
          total={categories.total}
          onPageChange={handlePageChange}
          activePage={activePage}
        />
      </CContainer>

      <CreateModal
        visible={categoryModalOpen}
        title="Create Menu"
        handleClose={handleClose}
        body={
          <CategoryForm data={categoryFormData} onChange={handleChange} onSubmit={handleSubmit} />
        }
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default Category
