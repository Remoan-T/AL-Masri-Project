// ** React Imports
import { Fragment, useContext } from 'react'
import { renderTransactions } from '@src/assets/dashboard-assets/mapCard';
import { renderTransactions1 } from '@src/assets/dashboard-assets/mapCard2';
import { useDispatch, useSelector } from "react-redux";
import { getSellsPort ,getFarmsCount, getBestPorts ,getBestFarms , getPurchaseChart} from './store';
import { ApexLineChart } from '@src/assets/dashboard-assets/ApexLineChart';
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { useEffect ,useState} from 'react';
import { useRTL } from '@hooks/useRTL'
import Spinner from '@src/assets/spinner/spinner.component';
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Reactstrap Imports
import StatsVertical from '@components/widgets/stats/StatsVertical'
import { Row, Col, Card, CardBody, CardTitle, CardText,CardHeader } from 'reactstrap'
import { ShoppingBag ,Home} from 'react-feather'

const AccessControl = () => {
  const store = useSelector((state) => state.dashboard);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { colors } = useContext(ThemeColors)
  const [isRtl] = useRTL()
  const user = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getSellsPort()),
          dispatch(getFarmsCount()),
          dispatch(getBestPorts()),
          dispatch(getBestFarms()),
          dispatch(getPurchaseChart()),
        ]);
        setIsDataFetched(true); 
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [dispatch]);

  
  // ** Context
  const ability = useContext(AbilityContext)

  if (isLoading || !isDataFetched) {
    return <div className="d-flex justify-content-center pt-5">
    {/* <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div> */}
    <Spinner/>
  </div>
  }

  return (
   <Fragment>
      {ability.can('read', 'ceo') ? (
        <Fragment>
        <Row>
      <Col xl='2' md='4' sm='6'>
      <StatsVertical icon={<ShoppingBag size={21} />} color='success' stats={store.sellsPort.toString()} statTitle='عدد منافذ البيع' />
    </Col>
    <Col xl='2' md='4' sm='6'>
      <StatsVertical icon={<Home size={21} />} color='primary' stats={store.farmsCount.toString()} statTitle='عدد المزارع' />
    </Col>
    <Col lg='4' md='6' xs='12'>
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>أفضل منافذ البيع</CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions(store.bestPorts)}</CardBody>
    </Card>
    </Col>
    <Col lg='4' md='6' xs='12'>
    <Card className='card-transaction'>
      <CardHeader>
        <CardTitle tag='h4'>أفضل المزارع</CardTitle>
      </CardHeader>
      <CardBody>{renderTransactions1(store.bestFarms)}</CardBody>
    </Card>
    </Col>
    </Row>
  
 

    <Row>
    <Col sm='12'>
          <ApexLineChart direction={'rtl'} cat={store.purchaseChart.labels} datapoints={store.purchaseChart.data} warning={colors.warning.main}
  title='عمليات الشراء' subTitle='مخطط عمليات الشراء'/>
        </Col>
    </Row>
   
   
    </Fragment>
      ) : null}

{/* {ability.can('read', 'CEO') ? (<di>ssa</di>) : null} */}

    </Fragment>
  )
}

export default AccessControl
