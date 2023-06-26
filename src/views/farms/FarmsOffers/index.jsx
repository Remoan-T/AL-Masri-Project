// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { customExpStyles } from "../../../assets/datatable/expandedStyles";
import { getOfferFarms } from "../store";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { renderModalCell } from "./modal.component";
import toast from "react-hot-toast";
import ToastDone from "@src/assets/toast/toastDone.component";
import ToastError from "@src/assets/toast/toastError.component";
import { useForm, useFieldArray, Controller } from "react-hook-form";
// ** Third Party Components
import { ChevronDown, Share, Grid, Search, Check } from "react-feather";
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
  Label,
  Input,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  InputGroupText,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Col,
} from "reactstrap";

const MySwal = withReactContent(Swal);

const DataTablesBasic = () => {
  const { handleSubmit, control } = useForm({
    // defaultValues: {
    //   selling_port_id: "",
    //   details: [{ amount: "", type: "" }],
    // }
  });

  const { fields, append, remove } = useFieldArray({
    control,
  });

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [numberInputValue, setNumberInputValue] = useState(0);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "اسم المزرعة",
      selector: (row) => row.farm.name,
    },
    {
      name: "الوزن الكلي",
      selector: (row) => row.total_amount,
    },
    ,
    {
      name: "التاريخ",
      selector: (row) => row.created_at,
    },
    {
      selector: (row, index) => renderModalCell(row, index),
    },
  ];

  const columns2 = [
    {
      name: "النوع",
      selector: (row) => row.type,
    },
    {
      name: "الكمية",
      selector: (row) => row.amount,
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div>
      <DataTable
        customStyles={customExpStyles}
        data={data.detailpurchase_orders}
        columns={columns2}
        className="react-dataTable"
        noHeader
      />
    </div>
  );

  const store = useSelector((state) => state.farm);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOfferFarms());
  }, [dispatch, store.OfferFarms.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.OfferFarms]);

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

  // const handleModalToggle = (index) => {
  //   const updatedFormModal = [...formModal];
  //   updatedFormModal[index] = !updatedFormModal[index];
  //   setFormModal(updatedFormModal);
  // };

  const handleExport = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "عروض المزارع";
    const formattedData = store.OfferFarms.map(
      ({ farm, created_at, total_amount }) => ({
        اسم_المزرعة: farm.name,
        الوزن_الكلي: total_amount,
        التاريخ: created_at,
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
      updatedData = store.OfferFarms.filter((item) => {
        const startsWith =
          item.created_at.toLowerCase().startsWith(value.toLowerCase()) ||
          item.farm.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.total_amount.toString().startsWith(value);

        const includes =
          item.created_at.toLowerCase().includes(value.toLowerCase()) ||
          item.farm.name.toLowerCase().includes(value.toLowerCase()) ||
          item.total_amount.toString().includes(value);

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
    : store.OfferFarms.length > 0;

  return (
    <Fragment>
      {/* table rendering code... */}
      {columns.map((column, columnIndex) => {
        if (column.selector === "Actions") {
          return (
            <div key={columnIndex}>{renderModalCell(row, columnIndex)}</div>
          );
        }
        return null;
      })}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>
            {" "}
            <h2>
              عروض المزارع
              <br />
              <br />
            </h2>
            <h3 className="text-danger">
              {" "}
              {store.OfferFarms == ""
                ? null
                : `عدد العروض : ${
                    searchValue.length
                      ? filteredData.length
                      : store.OfferFarms.length
                  }`}
            </h3>
          </CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <UncontrolledButtonDropdown>
              <DropdownToggle
                color="secondary"
                caret
                outline
                disabled={store.OfferFarms == ""}
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
              disabled={store.OfferFarms == ""}
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
              data={searchValue.length ? filteredData : store.OfferFarms}
              columns={columns}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
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
    </Fragment>
  );
};

export default DataTablesBasic;
