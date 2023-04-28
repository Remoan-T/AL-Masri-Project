// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getFarmData,AcceptFarm } from '../store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const DataTablesBasic = () => {
    const store = useSelector(state => state.farm)
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
        },
        ,
        {
            name: 'Actions',
            cell: row => (
                <button onClick={() => handleDelete(row.id)}>Accept</button>
            )
        }
    ]
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFarmData())
    }, [dispatch, store.data.length])

    const handleDelete = id => {
        if (window.confirm('هل تريد الموافقة على حساب مزرعة ؟؟')) {
            dispatch(AcceptFarm(id));
            dispatch(getFarmData())
        }
    };

    console.log(store.data)
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle tag='h4'>طلبات حساب مزرعة</CardTitle>
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
