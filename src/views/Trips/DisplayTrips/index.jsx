// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getTripsData } from "../store";
import { useEffect, useState } from "react";
import { customExpStyles } from "../../../assets/datatable/expandedStyles";
// ** Third Party Components
import { ChevronDown, Share, Grid, Trash2, Search } from "react-feather";
import DataTable from "react-data-table-component";

//styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

const MySwal = withReactContent(Swal);
const DataTablesBasic = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const ExpandedComponent = ({ data }) => <div >

  <DataTable
    customStyles={customExpStyles}
    data={data.requset1.sales_purchasing_requset_detail}
    columns={columns2}
    className='react-dataTable'
    noHeader
  />
</div>

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "رقم الشاحنة",
      selector: (row) => row.truck.truck_number,
    },

    {
      name: "اسم الشاحنة",
      selector: (row) => row.truck.name,
    },
    {
      name: "اسم السائق",
      selector: (row) => row.driver.name,
    },
    {
      name: "رقم هاتف السائق",
      selector: (row) => row.driver.mobile_number,
    },
    {
      name: "نوع الوجهة",
      selector: row => {
        if (row.farm_id)
          return <div>مزرعة</div>
        if (row.selling_port_id)
          return <div>منفذ بيع</div>

      }
    },
    {
      name: " الوجهة",
      // selector: row => row.requset1.selling_port.name
      selector: row => {
        if (row.farm_id)
          return row.requset1.farm.name
        if (row.selling_port_id)
          return row.requset1.selling_port.name

      }
    },
    {
      name: " الموقع",
      // selector: row => row.requset1.selling_port.name
      selector: row => {
        if (row.farm_id)
          return row.requset1.farm.location
        if (row.selling_port_id)
          return row.requset1.selling_port.location

      }
    },
    // {
    //   name: "المالك",
    //   selector: (row) => row.owner,
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

  const columns2 = [
    {
      name: 'النوع',
      selector: row => row.type
    },
    {
      name: 'الكمية',
      selector: row => row.amount

    },



  ]
  const store = useSelector((state) => state.trip);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTripsData());
  }, [dispatch, store.tripsData.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.tripsData]);

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
    const fileName = "الرحلات المتوفرة";
    const formattedData = store.tripsData.map(
      ({ driver, truck,}) => ({
       اسم_السائق: driver.name,
       رقم_الشاحنة: truck.truck_number,
       رقم_السائق: driver.mobile_number,

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
      updatedData = store.tripsData.filter((item) => {
        const startsWith =
          item.driver.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.truck.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.driver.mobile_number.toString().startsWith(value) ||
          item.truck.truck_number.toString().startsWith(value.toLowerCase());

        const includes =
        item.driver.name.toLowerCase().includes(value.toLowerCase()) ||
        item.truck.name.toLowerCase().includes(value.toLowerCase()) ||
        item.driver.mobile_number.toString().includes(value) ||
        item.truck.truck_number.toString().includes(value.toLowerCase());

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
        dispatch(getSellingPort());
      }
    });
  };

  const hasData = searchValue.length
    ? filteredData.length > 0
    : store.tripsData.length > 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
            الرحلات المتوفرة
            <br />
            <br />
            </h2>{" "}
            <h3 className="text-success">
              {" "}
              {store.tripsData == ""
                ? null
                : `عدد الرحلات : ${searchValue.length
                  ? filteredData.length
                  : store.tripsData.length
                }`}
            </h3>
          
        </CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="secondary"
              caret
              outline
              disabled={store.tripsData == ""}
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
        </div>
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
            disabled={store.tripsData == ""}
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
            data={searchValue.length ? filteredData : store.tripsData}
            columns={columns}
            className="react-dataTable"
            expandableRows={true}
            expandableRowsComponent={ExpandedComponent}
            expandOnRowClicked={false}
            expandOnRowDoubleClicked={false}
            expandableRowsHideExpander={false}
            sortIcon={<ChevronDown size={10} />}
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
