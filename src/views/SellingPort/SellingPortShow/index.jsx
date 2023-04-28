// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getSellingPort, removePort } from '../store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'


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
        ,
        {
            name: 'Actions',
            cell: row => (
                <button  onClick={() => handleDelete(row.id)} color='primary'>
                DELETE</button>

            )
        }
    ]
    const store = useSelector(state => state.selling)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSellingPort())
    }, [dispatch, store.SellingPort.length])

    const handleDelete = id => {
        if (window.confirm('هل تريد حذف منفذ بيع ؟؟')) {
            dispatch(removePort(id));
            dispatch(getSellingPort())
        }
    };
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
