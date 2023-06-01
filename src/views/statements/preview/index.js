// ** React Imports
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getStatements } from '../store'


// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'

// ** Styles
import '@styles/base/pages/app-invoice.scss'

const InvoicePreview = () => {
  // ** HooksVars
  const { id } = useParams()
  const store = useSelector(state => state.statement)
  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)

  // ** Functions to toggle add & send sidebar


  // ** Get invoice on mount based on id
  const dispatch = useDispatch()
  useEffect(() => {

      dispatch(getStatements())

  }, [dispatch, store.data.length])
  // && data.invoice !== undefined


  return store.data !== null ? (
    <div style={{width: '100%' ,marginRight:'13%'}}>
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        <Col xl={9} md={8} sm={12}>
          <PreviewCard data={store.data}  />
        </Col>
        <Col xl={3} md={4} sm={12} >
          {/* <div style={{paddingTop: '150px'}}>
          <PreviewActions  id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
          </div> */}
        </Col>
      </Row>
    </div>
    </div>
  ) : null

}

export default InvoicePreview
