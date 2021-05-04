import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
/*import CIcon from '@coreui/icons-react'*/
//import { Link } from 'react-router-dom'
import UpdateRole from '../../component/Role/UpdateRole';

class AllRole extends Component {

  render() {
    return(
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Modifier un rôle
              </CCardHeader>
              <CCardBody>
                <UpdateRole roleId={this.props.match.params} />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default AllRole
