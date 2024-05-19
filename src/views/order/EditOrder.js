import { useEffect, useState } from 'react'
import Async, { useAsync } from 'react-select/async'
import {
  CFormSelect,
  CCol,
  CModal,
  CForm,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from '@coreui/react'
import { genericFetch } from '../../services/api'
import AsyncCustomer from '../../components/util/AsyncCustomer'
import AsyncSource from '../../components/util/AsyncSource'
import { OrderStatus } from '../../Util/types'
import { updateOrder } from './services/api'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
}

export const EditOrderForm = ({ orderId, onClose, onOrderUpdate }) => {
  const [order, setOrder] = useState({})
  const [customer, setCustomer] = useState({})
  const [source, setSource] = useState({})
  const [status, setStatus] = useState('')
  const [menu, setMenu] = useState([])

  useEffect(() => {
    if (orderId) {
      genericFetch(`/orders/${orderId}`).then(({ data }) => {
        setOrder(data)
        const selectedMenu =
          data.menuItems.length > 0
            ? data.menuItems.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                }
              })
            : []
        setMenu(selectedMenu)
        setCustomer({
          value: data.customer?.id,
          label: `${data.customer?.firstName ?? ''} ${data.customer?.lastName ?? ''}`,
        })
        setSource({
          value: data.orderSource?.id,
          label: data.orderSource?.name,
        })
        setStatus(data.status)
      })
    }
  }, [orderId])
  const loadMenuOptions = async (inputValue) => {
    const { data } = await genericFetch('/menus/search', { query: inputValue })
    return data?.map((menu) => {
      return {
        label: menu.name,
        value: menu.id,
      }
    })
  }

  const handleMenuSelectionChange = (selectedOption) => {
    setMenu([...selectedOption])
  }

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption.target.value)
  }

  const handleSubmit = () => {
    const orderPatchData = {
      menu: menu.map((item) => item.value),
      orderSource: source.value,
      status,
      customer: customer.value,
    }
    updateOrder(orderPatchData, order.id).then(({ data }) => {
      onOrderUpdate(data)
      onClose()
    })
  }
  const handleCustomerChange = (customer) => {
    console.log({ customer })
    setCustomer(customer)
  }
  const handleSourceChange = (source) => {
    console.log({ source })
    setSource(source)
  }

  console.log({ customer, status, source, menu })
  return (
    <CModal visible={orderId} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Edit Menu</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit} className="row g-3">
          Menu Item
          <CCol md={12}>
            <Async
              isMulti
              cacheOptions
              loadOptions={loadMenuOptions}
              defaultOptions
              styles={customStyles}
              onChange={handleMenuSelectionChange}
              value={menu}
            />
          </CCol>
          <CCol md={12}>
            <AsyncCustomer customer={customer} onChange={handleCustomerChange} />
          </CCol>
          <CCol md={12}>
            <AsyncSource source={source} onChange={handleSourceChange} />
          </CCol>
          <CCol md={12}>
            Status
            <CFormSelect
              onChange={handleStatusChange}
              options={[
                'Choose a status',
                { label: OrderStatus.CLOSEDANDPAID, value: OrderStatus.CLOSEDANDPAID },
                { label: OrderStatus.CLOSEDANDUNPAID, value: OrderStatus.CLOSEDANDUNPAID },
                { label: OrderStatus.CANCELLED, value: OrderStatus.CANCELLED },
                { label: OrderStatus.OPEN, value: OrderStatus.OPEN },
              ]}
              value={status}
            />
          </CCol>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton onClick={onClose} color="secondary">
          Close
        </CButton>
        <CButton onClick={handleSubmit} type="submit" color="primary">
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
