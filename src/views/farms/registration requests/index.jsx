// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getFarmData,AcceptFarm } from '../store'
import { useEffect } from 'react'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'
const MySwal = withReactContent(Swal);

const DataTablesBasic = () => {
    const store = useSelector(state => state.farm)
    const columns = [
        {
            name: '#',
            name: '#', selector: (row, index) => index + 1, sortable: false
      
          },
        {
            name: 'اسم',
            selector: row => row.name
        },
        {
            name: 'عنوان',
            selector: row => row.location
        },
        {
            name: 'هاتف',
            selector: row => row.mobile_number
        },
        {
            name: 'مالك',
            selector: row => row.owner
        },
        ,
        {

            cell: row => (
              <button  className='btn-sm btn btn-primary' onClick={() => handleConfirmText(row.id)}>تأكيد الطلب</button>
            )
          }
    ]
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFarmData())
    }, [dispatch, store.data.length])

  

    const handleConfirmText = (id) => {
        return MySwal.fire({
          title: "هل تريد قبول الطلب ؟",
          text: "",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "قبول",
          cancelButtonText: "إالغاء",
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-outline-danger ms-1",
          },
          buttonsStyling: false,
        }).then(function (result) {
          if (result.value) {
            dispatch(AcceptFarm(id));
            dispatch(getFarmData())
          }
        });
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
