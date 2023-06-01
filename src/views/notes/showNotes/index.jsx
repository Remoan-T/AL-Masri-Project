// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getNoteData,removeNote } from '../store'
import { useEffect ,useState,Fragment} from 'react'
// ** Third Party Components
import { ChevronDown ,Plus,Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'

//styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'


import NoteSidebar from './Sidebar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle,Col } from 'reactstrap'

const MySwal = withReactContent(Swal)

const DataTablesBasic = () => {
    const columns = [
        {
            name: '#', selector: (row, index) => index + 1, sortable: false 
        },
          {
              name: 'التفاصيل',
              selector: row => row.detail
          },
          {
              name: 'من',
              selector: row => row.purchasing_manager_id
          },
          {
              name: 'الى',
              selector: row => row.production_manager_id
          },
          {
              
              cell: row => (

                  <Trash2  stroke='#ea5455' className='cursor-pointer' onClick={() => handleConfirmText(row.id)} />
      
              )
          }
      ]
    const store = useSelector(state => state.notes)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getNoteData())
    }, [dispatch, store.data.length])




    const handleConfirmText = id => {
        return MySwal.fire({
          title: 'هل تريد حذف الملاحظة ؟',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'حذف الملاحظة',
          cancelButtonText:'إالغاء',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ms-1'
          },
          buttonsStyling: false
        }).then(function (result) {
          if (result.value) {
            dispatch(removeNote(id));
            dispatch(getNoteData())
    }
        })
      }


    console.log(store.data)
    return (
        <Fragment>
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle><h2>الملاحظات</h2></CardTitle>
                <Col className='position-absolute end-0 px-3'>
                <Plus  className='cursor-pointer' onClick={() => toggleSidebar()}/>
                إضافة ملاحظة
                
                
                </Col>
                
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
        <NoteSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        </Fragment>
    )
}

export default DataTablesBasic
