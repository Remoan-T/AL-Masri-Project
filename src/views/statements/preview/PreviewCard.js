// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, Table,Alert } from 'reactstrap'
import { useParams  ,Link} from 'react-router-dom'
import { ReactComponent as Almasri } from '@src/assets/images/svg/almasri.svg';
import { useState,useEffect } from 'react';

const PreviewCard = ({ data }) => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true);
  const [SingleStatement, setSingleStatement] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const statement = data.find((statement) => statement.id === Number(id));
      setSingleStatement(statement);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [data, id]);

  if (loading) {
    return <div className="text-center my-3">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  }

  if (!SingleStatement) {
    return   <Alert color='danger fs-4'>
    <h2 className='alert-heading'>كشف غير موجود</h2>
    <div className='alert-body'>
      الكشف ذو الرقم {id} غير موجود توجه لعرض الكشوف :{' '}
      <Link className='text-decoration-underline' to='/statements/DisplayStatements'>عرض الكشوف</Link>
    </div>
  </Alert>
  }


  return data !== null ? (
    <Card className='invoice-preview-card'  >
      <CardBody className='invoice-padding pb-0'>
        {/* Header */}
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
          <div>
            <div className='logo-wrapper pt-3'>
              <Almasri style={{maxWidth:'100px', maxHeight:'100px' , paddingTop:'0px', marginTop:'0px',paddingRight:'0px',paddingLeft:'0px'}} />
              <h4 className='text-primary invoice-logo'>كشف إستلام</h4>
            </div>
          </div>
          <div className='mt-md-0 mt-2'>
            <h4 className='invoice-title'>
              رقم الكشف <span className='invoice-number'>#{SingleStatement.id}</span>
            </h4>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>تاريخ التحرير :</p>
              <p className='invoice-date'>{SingleStatement.created_at}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>الوزن الكلي :</p>
              <p className='invoice-date'>{SingleStatement.tot_weight} كغ</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>النافق :</p>
              <p className='invoice-date'>{SingleStatement.empty} كغ</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>الوزن الصافي :</p>
              <p className='invoice-date'>{SingleStatement.net_weight} كغ</p>
            </div>
          </div>
        </div>
        <div className='h5'>
        <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>اسم المزرعة :</p>
              <p className='invoice-date text-primary'>{SingleStatement.farm.name}</p>
            </div>
            <div className='invoice-date-wrapper'>
              <p className='invoice-date-title'>العنوان :</p>
              <p className='invoice-date text-primary'>{SingleStatement.farm.location}</p>
            </div>
            </div>
        {/* /Header */}
      </CardBody>

      <hr className='invoice-spacing' />

      <CardBody className='invoice-padding pb-0'>
      
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
            <CardText className='mb-0'>
            
            </CardText>
          </Col>
       {SingleStatement.poultry_receipt_detection_details.map((rec)=>     <Row >
            <h4 className='text-primary pb-2'>
            الطلب <span className='invoice-number'>#{rec.row_material_id}</span>
            </h4>
           <Col>
           <p className='invoice-total-title'>المادة :</p>
                <p className='invoice-total-amount'>{rec.row_material.name}</p>
           
           </Col>
           <Col>
           <p className='invoice-total-title'>عدد الأقفاص :</p>
                <p className='invoice-total-amount'>{rec.num_cages}</p>
           </Col>
           <Col>
           <p className='invoice-total-title'>الوزن :</p>
                <p className='invoice-total-amount'>{rec.tot_weight}</p>
           </Col>

           <Col>
           <p className='invoice-total-title'>الوزن الصافي :</p>
                <p className='invoice-total-amount'>{rec.net_weight}</p>
           </Col>
              <hr className='my-50' />
          </Row>)}
      </CardBody>
    </Card>
  ) : null
}

export default PreviewCard
