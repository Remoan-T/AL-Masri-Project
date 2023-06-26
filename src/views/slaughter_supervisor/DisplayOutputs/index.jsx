// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getAllSlaughterData } from "../store";
import { useEffect, useState } from "react";
// ** Third Party Components
import { ChevronDown, Share, Grid, Search } from "react-feather";
import DataTable from "react-data-table-component";
import { Trash2 } from "react-feather";

//styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Reactstrap Imports

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
  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "الوزن",
      selector: (row) => `${row.weight} كغ`,
    },

    {
      name: "النوع",
      selector: (row) => row.production_type_out_put.type,
    },
    // {
    //   name: "العنوان",
    //   selector: (row) => row.location,
    // },
    // {
    //   name: "الهاتف",
    //   selector: (row) => row.mobile_number,
    // },
    // {
    //   name: "المالك",
    //   selector: (row) => row.owner,
    // },
    // {
    //   name: "",
    //   cell: (row) => (
    //     <div>
    //       <Trash2
    //         stroke="#ea5455"
    //         className="cursor-pointer"
    //         onClick={() => handleConfirmText(row.id)}
    //       />
    //     </div>
    //   ),
    // },
  ];
  const store = useSelector((state) => state.slaughter);

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSlaughterData());
  }, [dispatch, store.allSlaughterData.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.allSlaughterData]);

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
    const fileName = "امخرجات قسم الذبح";
    const formattedData = store.allSlaughterData.map(
      ({ weight, production_type_out_put}) => ({
        النوع: production_type_out_put.type,
        الوزن: `${weight} كغ`,
     
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
      updatedData = store.allSlaughterData.filter((item) => {
        const startsWith =
        item.production_type_out_put.type.toLowerCase().startsWith(value.toLowerCase()) ||
        item.weight.toString().startsWith(value) 

      const includes =
      item.production_type_out_put.type.toLowerCase().includes(value.toLowerCase()) ||
      item.weight.toString().includes(value) 

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


  const hasData = searchValue.length
    ? filteredData.length > 0
    : store.allSlaughterData.length > 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
          مخرجات قسم الذبح
            </h2>
            <br />
            <br />
            <h3 className="text-success">
              {store.allSlaughterData == ""
                ? null
                : `عدد المخرجات : ${
                    searchValue.length
                      ? filteredData.length
                      : store.allSlaughterData.length
                  }`}
            </h3>
          
        </CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="secondary"
              caret
              outline
              disabled={store.slaughterData == ""}
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
            disabled={store.allSlaughterData == ""}
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
            data={searchValue.length ? filteredData : store.allSlaughterData}
            columns={columns}
            className="react-dataTable"
            keyField="string"
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
