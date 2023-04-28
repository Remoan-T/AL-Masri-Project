// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getNoteData,removeNote } from '../store'
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
              name: 'التفاصيل',
              selector: 'detail'
          },
          {
              name: 'من',
              selector: 'purchasing_manager_id'
          },
          {
              name: 'الى',
              selector: 'production_manager_id'
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
    const store = useSelector(state => state.notes)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getNoteData())
    }, [dispatch, store.data.length])

    const handleDelete = id => {
        if (window.confirm('هل تريد حذف ملاحظة ؟؟')) {
            dispatch(removeNote(id));
            dispatch(getNoteData())
        }
    };
    console.log(store.data)
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle tag='h4'>الملاحظات</CardTitle>
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
