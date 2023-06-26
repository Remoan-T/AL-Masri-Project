// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getCuttingInput } from "../store";
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
        name: "النوع",
        selector: (row) => row.output_types.type,
      },
    {
      name: "الوزن",
      selector: (row) => `${row.weight} كغ`,
    },
    {
      name: "التاريخ",
      selector: (row) => row.income_date,
    },
    {
      name: "الدخل",
      selector: (row) => row.input_from,
    },
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
  const store = useSelector((state) => state.cutting);

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCuttingInput());
  }, [dispatch, store.cuttingInput.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.cuttingInput]);

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
    const fileName = "مدخلات قسم التقطيع";
    const formattedData = store.cuttingInput.map(
      ({ input_from, output_types,weight,income_date }) => ({
        النوع:  output_types.type,
        الوزن: weight,
        من: input_from,
        تاريخ_الإدخال: income_date,
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
      updatedData = store.cuttingInput.filter((item) => {
        const startsWith =
          item.output_types.type.toLowerCase().startsWith(value.toLowerCase()) ||
          item.input_from.toLowerCase().startsWith(value.toLowerCase()) ||
          item.weight.toString().startsWith(value)

        const includes =
        item.output_types.type.toLowerCase().includes(value.toLowerCase()) ||
        item.input_from.toLowerCase().includes(value.toLowerCase()) ||
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

  const handleConfirmText = (id) => {
    return MySwal.fire({
      title: "هل تريد حذف المزرعة ؟",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "حذف المزرعة",
      cancelButtonText: "إالغاء",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        dispatch(removeFarm(id));
        dispatch(getCuttingInput());
      }
    });
  };
  const hasData = searchValue.length
    ? filteredData.length > 0
    : store.cuttingInput.length > 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
            المدخلات بقسم التقطيع
            <br />
            <br />
            <h3 className="text-success">
              {store.cuttingInput == ""
                ? null
                : `عدد المدخلات : ${
                    searchValue.length
                      ? filteredData.length
                      : store.cuttingInput.length
                  }`}
            </h3>
          </h2>{" "}
        </CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="secondary"
              caret
              outline
              disabled={store.cuttingInput == ""}
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
            disabled={store.cuttingInput == ""}
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
            data={searchValue.length ? filteredData : store.cuttingInput}
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
