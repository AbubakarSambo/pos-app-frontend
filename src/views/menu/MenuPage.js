import React, { useEffect, useState } from 'react'
import { CRow, CCol, CFormInput, CButton, CForm } from '@coreui/react'
import { MenuCard, NewMenuCard } from '../../components/MenuCard'
import { genericFetch } from '../../services/api'
import { CategoryCard, NewCategoryCard } from '../../components/CategoryCard'
import { CreateModal } from '../../components/CreateModal'
import { CategoryForm } from '../../components/forms/CategoryForm'
import { deleteMenu, saveCategory, saveMenu, updateMenu } from './services/api'
import { MenuForm } from '../../components/forms/MenuForm'
const MenuPage = () => {
  const [categories, setCategories] = useState([])
  const [menus, setMenus] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [menuModalOpen, setMenuModalOpen] = useState(false)
  const [categoryFormData, setCategoryFormData] = useState({ category: '' })
  const [menuFormData, setMenuFormData] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: null,
  })

  useEffect(() => {
    genericFetch('/categories').then(({ data }) => {
      setCategories(data.data)
    })
  }, [])

  useEffect(() => {
    genericFetch('/menus', { categoryId: activeCategory }).then(({ data }) => {
      setMenus(data.data)
    })
  }, [activeCategory])

  const resetCategoryFilter = () => {
    setActiveCategory(null)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setCategoryFormData({ ...categoryFormData, [name]: value })
  }

  const handleMenuChange = (e) => {
    const { name, value } = e.target
    setMenuFormData({ ...menuFormData, [name]: value })
  }

  const handleCategoryClick = (id) => {
    if (activeCategory === id) {
      resetCategoryFilter()
    } else {
      setActiveCategory(id)
    }
  }
  const handleNewCategoryClick = () => {
    setCategoryModalOpen(true)
  }

  const handleEdit = (props) => {
    const menuToEdit = menus.find((menu) => menu.id == props.id)
    const categoryToEdit = categories.find((category) => category.id == menuToEdit.categoryId)
    setIsInEditMode(true)
    setMenuFormData(menuToEdit)
    setMenuModalOpen(true)
  }
  const handleDelete = (id) => {
    deleteMenu(id).then(() => {
      const updatedMenus = menus.filter((menu) => {
        return menu.id !== id
      })
      setMenus(updatedMenus)
    })
  }

  const handleNewMenuClick = () => {
    setMenuModalOpen(true)
  }

  const handleSubmit = () => {
    const data = {
      name: categoryFormData.category,
    }
    saveCategory(data).then(({ data }) => {
      setCategoryFormData({})
      resetCategoryFilter()
      setCategoryModalOpen(false)
      setCategories([...categories, data])
    })
  }

  const handleMenuSubmit = () => {
    if (!isInEditMode) {
      saveMenu(menuFormData).then(({ data }) => {
        setMenuFormData({})
        resetCategoryFilter()
        setMenuModalOpen(false)
        setMenus([...menus, data])
      })
    } else {
      updateMenu(menuFormData).then(({ data }) => {
        setMenuFormData({})
        resetCategoryFilter()
        setMenuModalOpen(false)
        const updatedMenus = menus.map((menu) => {
          return menu.id === data.id ? { ...data } : menu
        })
        setMenus(updatedMenus)
      })
    }
  }
  const handleMenuClose = () => {
    setMenuFormData({})
    setMenuModalOpen(false)
    setIsInEditMode(false)
  }
  return (
    <>
      <CRow xs={{ cols: 4, gutter: 2 }} className="mb-3">
        <>
          {categories &&
            categories.map((category) => {
              return (
                <CategoryCard
                  name={category.name}
                  id={category.id}
                  handleClick={handleCategoryClick}
                  activeCategory={activeCategory}
                />
              )
            })}
          <NewCategoryCard handleClick={handleNewCategoryClick} />
        </>
      </CRow>

      <CRow
        className="mb-3"
        xs={{ cols: 1, gutter: 1 }}
        md={{ cols: 2, gutter: 2 }}
        lg={{ cols: 3, gutter: 4 }}
      >
        {menus &&
          menus.map((menu) => {
            return (
              <MenuCard
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSknZTMpLO8b1KObbbOdTxu0sEu1jw7C602dg&usqp=CAU"
                text={menu.name}
                id={menu.id}
                price={menu.price}
                description={menu.description}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          })}
        <NewMenuCard handleClick={handleNewMenuClick} />
      </CRow>
      <CreateModal
        visible={categoryModalOpen}
        title="Create Category"
        handleClose={() => setCategoryModalOpen(false)}
        body={
          <CategoryForm data={categoryFormData} onChange={handleChange} onSubmit={handleSubmit} />
        }
        onSubmit={handleSubmit}
      />
      <CreateModal
        visible={menuModalOpen}
        title="Create Menu"
        handleClose={handleMenuClose}
        body={
          <MenuForm
            categories={categories}
            data={menuFormData}
            onChange={handleMenuChange}
            onSubmit={handleMenuSubmit}
          />
        }
        onSubmit={handleMenuSubmit}
      />
    </>
  )
}

export default MenuPage
