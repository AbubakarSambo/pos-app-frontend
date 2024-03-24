import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CButton } from '@coreui/react'

export const CreateModal = (props) => {
  return (
    <CModal visible={props.visible} onClose={props.handleClose}>
      <CModalHeader>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{props.body}</CModalBody>
      <CModalFooter>
        <CButton onClick={props.handleClose} color="secondary">
          Close
        </CButton>
        <CButton onClick={props.onSubmit} type="submit" color="primary">
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
