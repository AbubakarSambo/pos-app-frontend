import { useEffect, useState } from 'react'
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
  const [total, setTotal] = useState(0)
  const [totalWithVat, setTotalWithVat] = useState(0)
  const [orderSource, setOrderSource] = useState({})
  const [orderButtonDisabled, setOrderButtonDisabled] = useState(true)
  const orgId = useUserOrg()
  useEffect(() => {
    if (props.menuItems.length > 0 && orderSource.value) {
      setOrderButtonDisabled(false)
    }
  }, [props.menuItems, orderSource])

  useEffect(() => {
    const total = props.menuItems.reduce(
      (accumulator, currentValue) => Number(currentValue.price) + accumulator,
      0,
    )
    setTotal(total)
    setTotalWithVat(0.075 * total)
  }, [props.menuItems])
  const loadOptions = async (inputValue) => {
    const { data } = await genericFetch('/customers/search', { query: inputValue })
    return data?.map((customer) => {
      return {
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer.id,
      }
    })
  }

  const loadSourceOptions = async () => {
    const { data } = await genericFetch('/order-sources')
    return data?.map((orderSource) => {
      return {
        label: orderSource.name,
        value: orderSource.id,
      }
    })
  }
  const handleSelectionChange = (selectedOption) => {
    setCustomer(selectedOption)
  }
  const handleOrderSourceSelectionChange = (selectedOption) => {
    setOrderSource(selectedOption)
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
      orderSource: orderSource.value,
    }

    placeOrder(orderObject).then(({ data }) => {
      handleCancelOrder()
    })
  }

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
              Source
              <Async
                cacheOptions
                loadOptions={loadSourceOptions}
                defaultOptions
                styles={customStyles}
                onChange={handleOrderSourceSelectionChange}
                value={orderSource}
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
              <CRow>
                <CCol>VAT(7.5%)</CCol>
                <CCol>{formatNumberWithCommas(0.075 * total)}</CCol>
              </CRow>
              <CRow>
                <CCol>Total)</CCol>
                <CCol>{formatNumberWithCommas(totalWithVat + total)}</CCol>
              </CRow>
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
