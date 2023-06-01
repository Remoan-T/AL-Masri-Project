// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, setSendSidebarOpen, setAddPaymentOpen }) => {
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        {/* <Button color='secondary' block outline className='mb-75'>
          Download
        </Button> */}
        <Button color='primary' tag={Link} to='/apps/invoice/print' target='_blank' block outline className='mb-75'>
          طباعة الكشف
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
