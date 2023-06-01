// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getTrips, specificStatement } from '../store'
import { useEffect, useState } from 'react'
// ** Third Party Components
import { ChevronDown, Share, Grid } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Trash2 } from 'react-feather'

//styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'


import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




// ** Reactstrap Imports


// ** Icon Imports
// import Icon from '@src/core/components/icon'


// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    Row,
    Col,
    Label,
    Input,
    UncontrolledButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";

const MySwal = withReactContent(Swal)
const DataTablesBasic = () => {
    const columns = [
        {
            name: '#', selector: (row, index) => index + 1, sortable: false
        },
        {
            name: 'اسم السائق',
            selector: row => row.driver.name
        },
        {
            name: 'الوزن الكلي',
            selector: row => row.requset1.total_amount
        },
        {
            name: 'التاريخ',
            selector: row => row.created_at
        },
        {
            name: '',
            cell: row => (
                // <button  onClick={() => handleConfirmText(row.id)} className='btn-sm btn btn-danger'>
                //   حذف المزرعة
                // </button>
                <div>

                    <a href={`/statements/AddShipmentWeight/${row.id}`}>وزن شحنة بعد الوصول</a>
                </div>
            )
        }
    ]
    const store = useSelector(state => state.statement)

    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getTrips())
    }, [dispatch, store.trips.length])




    const handleExport = () => {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = "الكشوف المتوفرة";
        const formattedData = store.AvailableFarms.map(
            ({ id, name, location, mobile_number, owner }) => ({
                المعرف: id,
                الاسم: name,
                العنوان: location,
                الهاتف: mobile_number,
                المالك: owner,


            })
        );
        const ws = XLSX.utils.json_to_sheet(formattedData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const dataFile = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(dataFile, fileName + fileExtension);
    };



    const handleFilter = (e) => {
        const value = e.target.value;
        let updatedData = [];
        setSearchValue(value);

        if (value.length) {
            updatedData = store.AvailableFarms.filter((item) => {
                const startsWith =
                    item.name.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.location.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.mobile_number.toString().startsWith(value) ||
                    item.owner.toLowerCase().startsWith(value.toLowerCase())



                const includes =
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.location.toLowerCase().includes(value.toLowerCase()) ||
                    item.mobile_number.toString().includes(value) ||
                    item.owner.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith;
                } else if (!startsWith && includes) {
                    return includes;
                } else return null;
            });
            setFilteredData(updatedData);
            setSearchValue(value);
        }
    };


    const handleConfirmText = id => {
        dispatch(specificStatement(id));


    }


    return (
        <Card className='overflow-hidden'>
            <CardHeader>
                <CardTitle >
                    {" "}
                    <h2>الرحلات المتوفرة<br /><br /><h3 className="text-success">عدد الرحلات : {store.data.length}</h3></h2>{" "}
                </CardTitle>
                <div className="d-flex mt-md-0 mt-1">
                    <UncontrolledButtonDropdown>
                        <DropdownToggle color="secondary" caret outline>
                            <Share size={15} />
                            <span className="align-middle ms-50">تصدير</span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem className="w-100" onClick={() => handleExport()}>
                                <Grid size={15} />
                                <span className="align-middle ms-50">ملف Excel</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                </div>
            </CardHeader>
            <Row className="justify-content-end mx-0">
                <Col
                    className="d-flex align-items-center justify-content-end mt-1"
                    md="6"
                    sm="12"
                >
                    <Label className="me-1" for="search-input">
                        البحث
                    </Label>
                    <Input
                        className="dataTable-filter mb-50"
                        type="text"
                        onChange={handleFilter}
                        bsSize="sm"
                        id="search-input"
                        value={searchValue}
                    />
                </Col>
            </Row>
            <div className='react-dataTable'>
                <DataTable
                    noHeader
                    pagination
                    data={searchValue.length ? filteredData : store.trips}
                    columns={columns}
                    className='react-dataTable'
                    keyField='string'
                    sortIcon={<ChevronDown size={10} />}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
            </div>
        </Card>
    )
}

export default DataTablesBasic
