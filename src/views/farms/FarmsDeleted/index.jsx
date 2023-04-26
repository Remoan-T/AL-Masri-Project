// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getDeletedFarms } from '../store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'
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
        name: 'هاتف',
        selector: 'mobile_number'
    },
    {
        name: 'مالك',
        selector: 'owner'
    }
]
const DataTablesBasic = () => {
    const store = useSelector(state => state.farm)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDeletedFarms())
    }, [dispatch, store.deletedFarms.length])


    console.log(store.deletedFarms)
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle tag='h4'>المزارع المحذوفة</CardTitle>
            </CardHeader>
            <div className='react-dataTable'>
                <DataTable
                    noHeader
                    pagination
                    data={store.deletedFarms}
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
