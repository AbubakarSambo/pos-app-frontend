import React from 'react'
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { CCard, CCardBody, CCardImage, CCardText, CCol } from '@coreui/react'
import { cilPlus, cilSettings } from '@coreui/icons'
import { formatNumberWithCommas } from '../Util/functions'
export const MenuCard = (props) => {
  return (
    <CCol key={props.id}>
      <CCard style={{ width: '18rem' }}>
        <CCardImage orientation="top" src={props.imageUrl} />
        <CCardBody>
          <div className="d-flex justify-content-between">
            <div>
              <CCardText>{props.text}</CCardText>
            </div>
            <CIcon onClick={() => props.onAddToOrder(props)} size="lg" icon={cilPlus} />
          </div>
          <CCardText>{props.description}</CCardText>
          <div className="d-flex justify-content-between">
            <CCardText>{formatNumberWithCommas(props.price)}</CCardText>

            <CDropdown placement="bottom-end">
              <CDropdownToggle custom color="secondary">
                <CIcon icon={cilSettings} className="me-2 cursor-pointer" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => props.onEdit(props)}>Edit</CDropdownItem>
                <CDropdownItem onClick={() => props.onDelete(props.id)}>Delete</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export const NewMenuCard = (props) => {
  return (
    <CCol>
      <CCard onClick={() => props.handleClick()} style={{ width: '18rem' }}>
        <CCardBody className="d-flex align-items-center cursor-pointer bg-secondary">
          <CIcon icon={cilPlus} height={32} /> Add Menu
        </CCardBody>
      </CCard>
    </CCol>
  )
}
