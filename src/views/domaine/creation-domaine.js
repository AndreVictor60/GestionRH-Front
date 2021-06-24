import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
/*import CIcon from '@coreui/icons-react'*/
//import { Link } from 'react-router-dom'
import CreateDomaine from '../../component/Domaine/CreateDomaine';

class createDomaine extends Component {

  render() {
    return(
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                <CreateDomaine />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default createDomaine
