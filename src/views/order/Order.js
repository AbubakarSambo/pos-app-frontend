import React from 'react'
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { CCard, CCardBody, CCardImage, CCardText, CCol } from '@coreui/react'
import { cilPlus, cilSettings } from '@coreui/icons'

const Order = () => {
  return <NewOrderCard handleClick={() => console.log('clicked')} />
}

export default Order

const NewOrderCard = (props) => {
  return (
    <CCol>
      <CCard onClick={() => props.handleClick()} style={{ width: '18rem' }}>
        <CCardBody className="d-flex align-items-center cursor-pointer bg-secondary">
          <CIcon icon={cilPlus} height={32} /> Add Order
        </CCardBody>
      </CCard>
    </CCol>
  )
}
