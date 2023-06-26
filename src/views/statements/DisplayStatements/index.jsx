// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getStatements, specificStatement } from '../store'
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
            name: 'اسم المزرعة',
            selector: row => row.farm.name
        },

        {
            name: 'الوزن الكلي',
            selector: row => row.tot_weight
        },
        {
            name: 'الوزن الصافي ',
            selector: row => row.net_weight

        },
        {
            name: 'عدد الاقفاص',
            selector: row => row.num_cages

        },
        {
            name: 'التاريخ',
            selector: row => row.updated_at
        },
        {
            name: '',
            selector: row => {
                if (row.is_weighted_after_arrive === 1)
                    return (<a href={`/statements/DisplaySpecificStatement/${row.id}`}>استعراض وزن الشخنة</a>)
                if (row.is_weighted_after_arrive === 0)
                    return (<a href={`/statements/AddShipmentWeight/${row.id}`}>اضافة وزن الشحنة</a>)

            }

        }
    ]
    const store = useSelector(state => state.statement)

    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getStatements())
    }, [dispatch, store.data.length])

    const columns2 = [
        {
            name: "عدد الطيور",
            selector: (row) => row.num_birds,
        },
        {
            name: "عدد الاقفاص",
            selector: (row) => row.num_birds,
        },
        {
            name: "الوزن الكلي",
            selector: (row) => row.tot_weight
            ,
        },
    ];
    const ExpandedComponent = ({ data }) => (
        <div>
            <DataTable
                data={data.poultry_receipt_detection_details}
                columns={columns2}
                className="react-dataTable"
                noHeader
            />
        </div>
    );



    const handleExport = () => {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = "الكشوف المتوفرة";
        const formattedData = store.data.map(
            ({ farm,
                tot_weight,
                net_weight,
                num_cages,
                updated_at }) => ({
                    اسم_المزرعة: farm.name,
                    الوزن_الكلي: tot_weight,
                    الوزن_الصاقي: net_weight,
                    عدد_الأقفاص: num_cages,
                    التاريخ: updated_at,


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
            updatedData = store.data.filter((item) => {
                const startsWith =
                    item.farm.name.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.tot_weight.toString().startsWith(value) ||
                    item.net_weight.toString().startsWith(value) ||
                    item.num_cages.toString().startsWith(value) ||
                    item.updated_at.toString().startsWith(value)



                const includes =
                    item.farm.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.tot_weight.toString().includes(value) ||
                    item.net_weight.toString().includes(value) ||
                    item.num_cages.toString().includes(value) ||
                    item.updated_at.toString().includes(value)

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
                    <h2>الكشوف المتوفرة<br /><br /><h3 className="text-success">عدد الكشوف : {store.data.length}</h3></h2>{" "}
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
                    data={searchValue.length ? filteredData : store.data}
                    columns={columns}
                    className='react-dataTable'
                    keyField='string'
                    sortIcon={<ChevronDown size={10} />}
                    expandableRows={true}
                    expandableRowsComponent={ExpandedComponent}
                    expandOnRowClicked={false}
                    expandOnRowDoubleClicked={false}
                    expandableRowsHideExpander={false}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
            </div>
        </Card>
    )
}

export default DataTablesBasic
