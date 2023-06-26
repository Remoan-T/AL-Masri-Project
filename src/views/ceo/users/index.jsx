// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../store";
import { useEffect, useState, Fragment } from "react";
// ** Third Party Components
import { ChevronDown, Share, Grid, Trash2, Search , RefreshCcw} from "react-feather";
import DataTable from "react-data-table-component";

//styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import NoteSidebar from './Sidebar';

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
  Button,
  Badge
} from "reactstrap";

const MySwal = withReactContent(Swal);
const DataTablesBasic = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "الاسم الأول",
      selector: (row) => row.first_name,
    },
    {
      name: "الاسم الأخير",
      selector: (row) => row.last_name,
    },
    {
      name: "الدور",
      selector: (row) => {
        switch (row.managing_level) {
          case 'libra-commander':
              return <span className='user-status fs-5'>آمر القبان</span>;
          case 'Purchasing-and-Sales-manager':
              return <span className='user-status fs-5'>مدير المشتريات والمبيعات</span>;
          case 'Mechanism-Coordinator':
              return <span className='user-status fs-5'>منسق حركة الآليات</span>;
          case 'cutting_supervisor':
              return <span className='user-status fs-5'>مشرف قسم التقطيع</span>;
          case 'slaughter_supervisor':
              return <span className='user-status fs-5'>مشرف قسم الذبح</span>;
          case 'warehouse_supervisor':
              return <span className='user-status fs-5'>مشرف المخازن</span>;
          case 'Manufacturing_Supervisor':
              return <span className='user-status fs-5'>مشرف التصنيع</span>;
          case 'ceo':
              return <span className='user-status fs-5'>المدير التنفيذي</span>;
          case 'Production_Manager':
              return <span className='user-status fs-5'>مدير الإنتاج</span>;    
          case 'Accounting-Manager':
              return <span className='user-status fs-5'>مدير الحسابات</span>;    
          default:
              return <span className='user-status fs-5'>{row.managing_level}</span>;  
        }
      },
    },
    {
      name: "الحالة",
      selector: (row) => {
        if(row.date_of_leave)
        return      <Badge color="danger" pill>غير مفعل</Badge>
        else return <Badge color="success" pill> مفعل</Badge>
      }
    },
    // {
    //   name: "المالك",
    //   selector: (row) =>  
    // },
    // {
    //   cell: (row) => (
    //     // <button  onClick={() => handleDelete(row.id)} color='primary'>
    //     // DELETE</button>
    //     <Trash2
    //       stroke="#ea5455"
    //       className="cursor-pointer"
    //       onClick={() => handleConfirmText(row.id)}
    //     />
    //   ),
    // },
  ];
  const store = useSelector((state) => state.ceo);

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersData());
  }, [dispatch, store.usersData.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.usersData]);

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

  const handleExport = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "منافذ البيع";
    const formattedData = store.usersData.map(
      ({ id, name, location, mobile_number, type, owner }) => ({
        المعرف: id,
        الاسم: name,
        المكان: location,
        النوع: type,
        رقم_الهاتف: mobile_number,
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
      updatedData = store.usersData.filter((item) => {
        const startsWith =
          item.first_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.last_name.toLowerCase().startsWith(value.toLowerCase()) 


        const includes =
        item.first_name.toLowerCase().includes(value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(value.toLowerCase()) 


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

  const handleConfirmText = (id) => {
    return MySwal.fire({
      title: "هل تريد حذف نقطة البيع ؟",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "إالغاء",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        dispatch(removePort(id));
        dispatch(getusersData());
      }
    });
  };

  const hasData = searchValue.length
    ? filteredData.length > 0
    : store.usersData.length > 0;

  return (
    <Fragment>
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
          المستخدمين
            <br />
            <br />
            </h2>{" "}
            <h3 className="text-success">
              {" "}
              {store.usersData == ""
                ? null
                : `عدد المستخدمين: ${
                    searchValue.length
                      ? filteredData.length
                      : store.usersData.length
                  }`}
            </h3>
        
        </CardTitle>
        {/* <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="secondary"
              caret
              outline
              disabled={store.usersData == ""}
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

        <Col className='position-absolute end-0 px-3'>
              

                <Button color="primary" onClick={() => toggleSidebar()}>
  <RefreshCcw size={18} className='cursor-pointer' />
  &nbsp; &nbsp; تبديل مستخدم 
                </Button>

                
                </Col>
      </CardHeader>
      <Row className="justify-content-end mx-0">
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
            disabled={store.usersData == ""}
            placeholder="البحث ..."
          />
        </InputGroup>
      </Row>
      {isLoading ? (
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
            data={searchValue.length ? filteredData : store.usersData}
            columns={columns}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>
      ) : showNoDataMessage ? (
        <div className="text-center my-3 text-danger h3">لا توجد بيانات</div>
      ) : null}
    </Card>
    <NoteSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
    
  );
};

export default DataTablesBasic;
