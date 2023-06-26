// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getCuttingOutput } from "../store";
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
      name: "تاريخ الإضافة",
      selector: (row) => row.created_at,
      sortable: false,
    },

    // {
    //   name: "التاريخ",
    //   selector: (row) => row.created_at,
    // },
    // {
    //   name: "الكمية الكلية",
    //   selector: (row) => row.total_amount,
    // },
  ];
  const columns2 = [
    {
      name: "النوع",
      selector: (row) => row.output_types.type,
    },
    {
      name: "الوزن",
      selector: (row) => `${row.weight} كغ`,
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
      updatedData = store.cuttingOutput.filter((item) => {
        const startsWithPort =
        
        item.created_at.toLowerCase().startsWith(value.toLowerCase());


        const includesPort =

        item.created_at.toLowerCase().includes(value.toLowerCase());

      

        if (startsWithPort || includesPort ) {
          return true;
        } else {
          return false;
        }
      });
      setsearchData(updatedData);
      setSearchValue(value);
    }
  };

  const store = useSelector((state) => state.cutting);

  const [searchValue, setSearchValue] = useState("");
  const [searchData, setsearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const ExpandedComponent = ({ data }) => (
    <div>
      <DataTable
        customStyles={customStyles}
        data={data.detail_output_cutiing}
        columns={columns2}
        className="react-dataTable"
        noHeader
      />
    </div>
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCuttingOutput());
  }, [dispatch, store.cuttingOutput.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.cuttingOutput]);

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
    : store.cuttingOutput.length > 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
            مخرجات قسم التقطيع
            </h2>
            <br />
            <br />
            <h3 className="text-success">
              {" "}
              {store.cuttingOutput == ""
                ? null
                : `عدد المخرجات : ${
                    searchValue.length
                      ? searchData.length
                      : store.cuttingOutput.length
                  }`}
            </h3>
          
        </CardTitle>

        {/* <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="secondary"
              caret
              outline
              disabled={store.cuttingOutput == ""}
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
            disabled={store.cuttingOutput == ""}
            placeholder="البحث ..."
          />
        </InputGroup>
      </Row>
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
            data={searchValue.length ? searchData : store.cuttingOutput}
            columns={columns}
            className="react-dataTable"
            expandableRows={true}
            expandableRowsComponent={ExpandedComponent}
            expandOnRowClicked={false}
            expandOnRowDoubleClicked={false}
            expandableRowsHideExpander={false}
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
