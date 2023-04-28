// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getOfferFarms, removeFarm } from '../store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Icon Imports
// import Icon from '@src/core/components/icon'


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

// ** Reactstrap Imports
const ExpandedComponent = ({ data }) => <div >

    {data.detailpurchase_orders.map(home => <p>{home.type} {home.amount}</p>)}
</div>


const DataTablesBasic = () => {
    const columns = [
        {
            name: 'id',
            selector: 'id'

        },

        {
            name: 'اسم',
            selector: 'total_amount'
        },

        {
            name: 'Actions',
            cell: row => (
                <button aria-label='capture screenshot' onClick={() => handleDelete(row.id)} color='primary'>
                    delete
                </button>

            )
        }
    ]
    const store = useSelector(state => state.farm)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOfferFarms())
    }, [dispatch, store.OfferFarms.length])

    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle tag='h4'>Zero Configuration</CardTitle>
            </CardHeader>
            <div className='react-dataTable'>
                <DataTable
                    noHeader
                    pagination
                    data={store.OfferFarms}
                    columns={columns}
                    className='react-dataTable'
                    expandableRows={true}
                    expandableRowsComponent={ExpandedComponent}
                    expandOnRowClicked={false}
                    expandOnRowDoubleClicked={false}
                    expandableRowsHideExpander={false}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
            </div>
        </Card>
    )
}

export default DataTablesBasic
