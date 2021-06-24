import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
/*import CIcon from '@coreui/icons-react'*/
//import { Link } from 'react-router-dom'
import UpdateDomaine from '../../component/Domaine/UpdateDomaine';

class updateDomaine extends Component {

  render() {
    return(
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                <UpdateDomaine domaineId={this.props.match.params} />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default updateDomaine
