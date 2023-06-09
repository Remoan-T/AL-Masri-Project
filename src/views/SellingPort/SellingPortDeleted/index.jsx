// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getDeletedSelling, RestorePort } from "../store";
import { useEffect, useState } from "react";
// ** Third Party Components
import { ChevronDown, Share, Grid, Search } from "react-feather";
import DataTable from "react-data-table-component";

//styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "المعرف",
      selector: (row) => row.id,
    },

    {
      name: "الاسم",
      selector: (row) => row.name,
    },
    {
      name: "العنوان",
      selector: (row) => row.location,
    },
    {
      name: "نوع المنفذ",
      selector: (row) => row.type,
    },
    {
      name: "الهاتف",
      selector: (row) => row.mobile_number,
    },
    {
      name: "المالك",
      selector: (row) => row.owner,
    },
    {
      cell: (row) => (
        <button
          className="btn-sm btn btn-success"
          onClick={() => handleConfirmText(row.id)}
        >
          استرجاع
        </button>
      ),
    },
  ];
  const store = useSelector((state) => state.selling);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDeletedSelling());
  }, [dispatch, store.deletedSelling.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.deletedSelling]);

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
    const fileName = "المنافذ المحذوفة";
    const formattedData = store.deletedSelling.map(
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
      updatedData = store.deletedSelling.filter((item) => {
        const startsWith =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.type.toLowerCase().startsWith(value.toLowerCase()) ||
          item.mobile_number.toString().startsWith(value) ||
          item.owner.toLowerCase().startsWith(value.toLowerCase()) ||
          item.location.toString().startsWith(value.toLowerCase());

        const includes =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase()) ||
          item.mobile_number.toString().includes(value) ||
          item.owner.toLowerCase().includes(value.toLowerCase()) ||
          item.location.toString().includes(value.toLowerCase());

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
      title: "هل تريد حذف استرجاع نقطة البيع ؟",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "استرجاع",
      cancelButtonText: "إالغاء",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        dispatch(RestorePort(id));
        dispatch(getDeletedSelling());
      }
    });
  };

  const hasData = searchValue.length
    ? filteredData.length > 0
    : store.deletedSelling.length > 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
            منافذ البيع المحذوفة
            <br />
            <br />
            <h3 className="text-danger">
              {" "}
              {store.deletedSelling == ""
                ? null
                : `عدد المنافذ المحذوفة : ${
                    searchValue.length
                      ? filteredData.length
                      : store.deletedSelling.length
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
              disabled={store.deletedSelling == ""}
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
            disabled={store.deletedSelling == ""}
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
            data={searchValue.length ? filteredData : store.deletedSelling}
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
  );
};

export default DataTablesBasic;
