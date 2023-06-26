// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { DisplayOutputfrige3content } from "../store";
import { useEffect, useState } from "react";
// ** Third Party Components
import { Share, Grid, Search } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

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
    InputGroup,
    InputGroupText,
} from "reactstrap";

// ** Reactstrap Imports
const customStyles = {
    rows: {},
    headCells: {
        style: {
            paddingLeft: "8px", // override the cell padding for head cells
            paddingRight: "8px",
            marginRight: "70px",
        },
    },
    cells: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
            paddingRight: "8px",
            marginRight: "70px",
        },
    },
};

const DataTablesBasic = () => {
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            sortable: false,
        },
        {
            name: " وزن الخرج",
            selector: (row) => row.weight,
        },
        {
            name: " نوع المادة",
            selector: (row) => row.detonator3.warehouse.out_put__type__production.type,
        },

        {
            name: "تاريخ الاخراج",
            selector: (row) => row.created_at,
        },
        {
            name: "الاحراج الى ",
            selector: (row) => row.output_to,
        }

    ];
    const columns2 = [
        {
            name: "البراد الصفري",
            selector: (row) => row.zero_frige.weight,
        },
        {
            name: "البحرات",
            selector: (row) => row.lake.weight,
        },

    ];

    const handleExport = () => {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName = "الطلبات غير المقبولة";
        const formattedData = store.SellingPortOffer.map(
            ({
                request_type,
                farm,
                selling_port,
                reason_refuse,
                total_amount,
                created_at,
            }) => ({
                نوع_الطلب: request_type == 1 ? "طلب مبيع" : "طلب شراء",
                صاحب_الطلب: farm ? farm.name : selling_port.name,
                سبب_عدم_القبول: reason_refuse,
                تاريخ_إنشاء_الطلب: created_at,
                الكمية_الكلية: total_amount,
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
            updatedData = store.SellingPortOffer.filter((item) => {
                const startsWithPort =
                    item.selling_port &&
                    item.selling_port.name.toLowerCase().startsWith(value.toLowerCase());
                const includesPort =
                    item.selling_port &&
                    item.selling_port.name.toLowerCase().includes(value.toLowerCase());

                const otherStart = item.total_amount.toString().startsWith(value);
                const otherIncludes = item.total_amount.toString().includes(value);

                if (startsWithPort || includesPort || otherStart || otherIncludes) {
                    return true;
                } else {
                    return false;
                }
            });
            setsearchData(updatedData);
            setSearchValue(value);
        }
    };

    const store = useSelector((state) => state.friges);

    const [searchValue, setSearchValue] = useState("");
    const [searchData, setsearchData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showNoDataMessage, setShowNoDataMessage] = useState(false);

    const ExpandedComponent = ({ data }) => (
        <div>
            <DataTable
                customStyles={customStyles}
                data={store.Outputfrige3content}
                columns={columns2}
                className="react-dataTable"
                noHeader
            />
        </div>
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(DisplayOutputfrige3content());
    }, [dispatch, store.Outputfrige3content.length]);

    useEffect(() => {
        const delay = 500;
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [store.Outputfrige3content]);

    useEffect(() => {
        const delay = 1600;
        const timer = setTimeout(() => {
            if (!isLoading && !hasData) {
                setShowNoDataMessage(true);
            }
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [isLoading, hasData]);

    const hasData = searchValue.length
        ? searchData.length > 0
        : store.Outputfrige3content.length > 0;

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>
                    {" "}
                    <h2>
                        مخرجات مستودع صواعق 3
                        <br />
                        <br />
                        <h3 className="text-success">
                            {" "}
                            {store.Outputfrige3content == ""
                                ? null
                                : `عدد المخرجات : ${searchValue.length
                                    ? searchData.length
                                    : store.Outputfrige3content.length
                                }`}
                        </h3>
                    </h2>{" "}
                </CardTitle>
{/* 
                <div className="d-flex mt-md-0 mt-1">
                    <UncontrolledButtonDropdown>
                        <DropdownToggle
                            color="secondary"
                            caret
                            outline
                            disabled={store.Outputfrige3content == ""}
                        >
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
                </div> */}
            </CardHeader>
            {/* <Row className="justify-content-end mx-0">
                <InputGroup className="mb-2">
                    <InputGroupText>
                        <Search size={14} />
                    </InputGroupText>
                    <Input
                        className="dataTable-filter"
                        type="text"
                        onChange={handleFilter}
                        id="search-input"
                        value={searchValue}
                        disabled={store.Outputfrige3content == ""}
                        placeholder="البحث ..."
                    />
                </InputGroup>
            </Row> */}
            {isLoading ? ( // Show the loading spinner while isLoading is true
                <div className="text-center my-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : hasData ? (
                <div className="react-dataTable">
                    <DataTable
                        noHeader
                        pagination
                        data={searchValue.length ? searchData : store.Outputfrige3content}
                        columns={columns}
                        className="react-dataTable"
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                    />
                </div>
            ) : showNoDataMessage ? (
                <div className="text-center my-3 text-danger h3">لا توجد بيانات</div>
            ) : null}
        </Card>
    );
};

export default DataTablesBasic;
