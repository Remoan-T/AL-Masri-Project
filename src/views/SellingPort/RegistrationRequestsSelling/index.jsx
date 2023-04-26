// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getSellingReqData, AcceptPort } from '../store'
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
            name: 'مالك',
            selector: 'owner'
        },
        {
            name: 'Actions',
            cell: row => (
                <button onClick={() => handleDelete(row.id)}>Accept</button>
            )
        }
    ]
    const store = useSelector(state => state.selling)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSellingReqData())
    }, [dispatch, store.data.length])

    const handleDelete = id => {
        if (window.confirm('هل تريد الموافقة على حساب منفذ بيع ؟؟')) {
            dispatch(AcceptPort(id));
        }
    };
    console.log(store.data)
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle tag='h4'>طلبات تسجيل حساب منفذ بيع</CardTitle>
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
