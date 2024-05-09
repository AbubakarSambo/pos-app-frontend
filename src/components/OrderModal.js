import {
  COffcanvasHeader,
  COffcanvasBody,
  COffcanvasTitle,
  CModalHeader,
  CModalTitle,
  CButton,
  COffcanvas,
  CCloseButton,
  CRow,
  CCol,
} from '@coreui/react'
import Async, { useAsync } from 'react-select/async'
import { genericFetch, placeOrder } from '../services/api'
import { useEffect, useState } from 'react'
import { formatNumberWithCommas } from '../Util/functions'
import { useUserOrg } from '../hooks/useUserRole'
import { OrderStatus } from '../Util/types'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
}

export const OrderModal = (props) => {
  const [customer, setCustomer] = useState({})
  const [orderButtonDisabled, setOrderButtonDisabled] = useState(true)
  console.log({ props, customer })
  const orgId = useUserOrg()
  useEffect(() => {
    if (props.menuItems.length > 0 && customer.value) {
      setOrderButtonDisabled(false)
    }
  }, [props.menuItems, customer])
  const loadOptions = async (inputValue) => {
    const { data } = await genericFetch('/customers/search', { query: inputValue })
    return data?.map((customer) => {
      return {
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer.id,
      }
    })
  }
  const handleSelectionChange = (selectedOption) => {
    // Handle the selected option(s)
    console.log('Selected Option:', selectedOption)
    setCustomer(selectedOption)
  }
  const handleCancelOrder = () => {
    props.onCancelOrder([])
    props.handleClose()
    setCustomer({})
  }

  const handlePlaceOrder = () => {
    const orderObject = {
      orgId,
      orderDate: new Date(),
      status: OrderStatus.OPEN,
      customer: customer.value,
      menu: props.menuItems.map((item) => item.id),
    }
    console.log({ orderObject })
    placeOrder(orderObject).then(({ data }) => {
      console.log({ data })
      handleCancelOrder()
    })
  }
  console.log({ menuItems: props.menuItems })
  return (
    <>
      <COffcanvas placement="end" visible={props.visible} onHide={props.handleClose}>
        <COffcanvasHeader>
          <COffcanvasTitle>Order Items</COffcanvasTitle>
        </COffcanvasHeader>
        <COffcanvasBody>
          <div className="d-flex flex-column h-100 justify-content-between">
            <div>
              Customer Name
              <Async
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                styles={customStyles}
                onChange={handleSelectionChange}
                value={customer}
              />
              <hr className="mt-2 mb-3" />
              {props.menuItems.map((menu) => {
                return (
                  <CRow>
                    <CCol>{menu.text}</CCol>
                    <CCol>{formatNumberWithCommas(menu.price)}</CCol>
                  </CRow>
                )
              })}
            </div>

            <div>
              <CButton
                disabled={orderButtonDisabled}
                className="w-100"
                color="info text-white mb-1"
                onClick={handlePlaceOrder}
              >
                Place Order
              </CButton>
              <CButton onClick={handleCancelOrder} className="w-100" color="danger text-white">
                Cancel
              </CButton>
            </div>
          </div>
        </COffcanvasBody>
      </COffcanvas>
    </>
  )
}
