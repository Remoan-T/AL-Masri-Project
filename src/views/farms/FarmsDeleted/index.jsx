// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getDeletedFarms, RestoreFarm } from '../store'
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
            name: 'هاتف',
            selector: 'mobile_number'
        },
        {
            name: 'مالك',
            selector: 'owner'
        },
        {
            name: 'Actions',
            cell: row => (
                <button onClick={() => handleRestore(row.id)}>Restore</button>
            )
        }
    ]
    const store = useSelector(state => state.farm)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDeletedFarms())
    }, [dispatch, store.deletedFarms.length])

    const handleRestore = id => {
        if (window.confirm('هل تريد استرجاع حساب منفذ بيع ؟؟')) {
            dispatch(RestoreFarm(id));
            dispatch(getDeletedFarms())
        }
    };
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
