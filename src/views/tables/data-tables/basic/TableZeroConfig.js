// ** Table Columns
import { data, basicColumns } from '../data'
import { useDispatch, useSelector } from 'react-redux'
import { getFarmData } from '../../../apps/farms/store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'
const columns=[
  {
    name:'id',
    selector:'id'
  
  },
  {
    name:'total',
    selector:'total_amount'
  },
  {
    name:'farm',
    selector:'farm.location'
  }
]
const DataTablesBasic = () => {
  const store = useSelector(state => state.farm)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFarmData())
  }, [dispatch, store.data.length])
  
  
  console.log(store.data)
  return (
    <Card className='overflow-hidden'>
      <CardHeader>
        <CardTitle tag='h4'>Zero Configuration</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          data={store.data}
          columns={columns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  )
}

export default DataTablesBasic
