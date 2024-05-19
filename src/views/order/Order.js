import React, { useEffect, useState } from 'react'
import { genericFetch } from '../../services/api'
import { formatNumberWithCommas } from '../../Util/functions'
import { EditOrderForm } from './EditOrder'
import { OrderStatus } from '../../Util/types'

const OrderStatusColor = {
  [OrderStatus.OPEN]: 'primary',
  [OrderStatus.CANCELLED]: 'info',
  [OrderStatus.CLOSEDANDPAID]: 'success',
  [OrderStatus.CLOSEDANDUNPAID]: 'danger',
}
const Order = () => {
  const [orders, setOrders] = useState([])
  const [activeOrderId, setActiveOrderId] = useState(null)
  useEffect(() => {
    genericFetch('/orders').then(({ data }) => {
      setOrders(data)
    })
  }, [])

  const handleSetUpdatedOrder = (order) => {
    console.log({ order })
  }
  return (
    <>
      <div class="container text-center mt-2">
        <div class="row bg-info border border-1 border-info rounded p-2 mb-3">
          <div class="col-3">Item</div>
          <div class="col">Order id</div>
          <div class="col">Customer</div>
          <div class="col">Date</div>
          <div class="col">Source</div>
          <div class="col">Total</div>
        </div>

        {orders &&
          orders.map((order) => {
            const total = order.menuItems.reduce(
              (accumulator, currentValue) => Number(currentValue.price) + accumulator,
              0,
            )
            const background = OrderStatusColor[order.status]
            return (
              <div
                onClick={() => setActiveOrderId(order.id)}
                class={`row bg-${background} border border-1 border-${background} rounded p-2 mb-3 cursor-pointer`}
              >
                <div class="col-3">
                  {order.menuItems &&
                    order.menuItems.map((menu) => {
                      return <p>{menu.name}</p>
                    })}
                </div>
                <div class="col">{order.id}</div>
                <div class="col">{`${order.customer?.firstName ?? ''} ${
                  order.customer?.lastName ?? ''
                }`}</div>
                <div class="col">{new Date(order.orderDate).toLocaleString()}</div>
                <div class="col">{order.orderSource.name}</div>
                <div class="col">{formatNumberWithCommas(total)}</div>
              </div>
            )
          })}
      </div>

      <EditOrderForm
        orderId={activeOrderId}
        onClose={() => setActiveOrderId(null)}
        onOrderUpdate={handleSetUpdatedOrder}
      />
    </>
  )
}

export default Order

// const NewOrderCard = (props) => {
//   return (
//     <CCol>
//       <CCard onClick={() => props.handleClick()} style={{ width: '18rem' }}>
//         <CCardBody className="d-flex align-items-center cursor-pointer bg-secondary">
//           <CIcon icon={cilPlus} height={32} /> Add Order
//         </CCardBody>
//       </CCard>
//     </CCol>
//   )
// }
