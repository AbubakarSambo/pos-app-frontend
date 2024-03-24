import React from 'react'
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { CCard, CCardBody, CCardImage, CCardText, CCol } from '@coreui/react'
import { cilPlus, cilSettings } from '@coreui/icons'
export const MenuCard = (props) => {
  return (
    <CCol key={props.id}>
      <CCard style={{ width: '18rem' }}>
        <CCardImage orientation="top" src={props.imageUrl} />
        <CCardBody>
          <CCardText>{props.text}</CCardText>
          <CCardText>{props.description}</CCardText>
          <div className="d-flex justify-content-between">
            <CCardText>{props.price}</CCardText>

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
