// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getAvailableFarms, removeFarm } from '../store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Icon Imports
// import Icon from '@src/core/components/icon'


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
                <IconButton aria-label='capture screenshot' onClick={() => handleDelete(row.id)} color='primary'>
                    <Icon icon='material-symbols:delete-outline-rounded' />
                </IconButton>

            )
        }
    ]
    const store = useSelector(state => state.farm)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAvailableFarms())
    }, [dispatch, store.AvailableFarms.length])

    const handleDelete = id => {
        if (window.confirm('هل تريد حذف مزرعة ؟؟')) {
            dispatch(removeFarm(id));
            dispatch(getAvailableFarms())
        }
    };

    console.log(store.AvailableFarms)
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle tag='h4'>المزارع المتاحة</CardTitle>
            </CardHeader>
            <div className='react-dataTable'>
                <DataTable
                    noHeader
                    pagination
                    data={store.AvailableFarms}
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
