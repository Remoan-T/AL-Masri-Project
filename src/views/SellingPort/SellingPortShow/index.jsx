// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getSellingPort, RestorePort } from '../store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const DataTablesBasic = () => {
    const columns = [
        {
            name: 'id',
            selector: 'id'
    
        },
    
        {
            name: 'اسم',
            selector: 'name'
        },
        {
            name: 'عنوان',
            selector: 'location'
        },
        {
            name: 'نوع المنفذ',
            selector: 'type'
        },
        {
            name: 'هاتف',
            selector: 'mobile_number'
        },
        {
            name: 'مالك',
            selector: 'owner'
        }
    ]
    const store = useSelector(state => state.selling)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSellingPort())
    }, [dispatch, store.SellingPort.length])
    

    console.log(store.SellingPort)
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle tag='h4'>المزارع المتاحة</CardTitle>
            </CardHeader>
            <div className='react-dataTable'>
                <DataTable
                    noHeader
                    pagination
                    data={store.SellingPort}
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
