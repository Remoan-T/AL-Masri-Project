// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { AcceptRequest } from "../store";
import axios from "axios";
import { customExpStyles } from "../../../assets/datatable/expandedStyles";
import { getRequests } from "../store";
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
  Badge
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
      name: 'نوع الطلب',
      selector: row => {
          if (row.selling_port_id)
              return <Badge color="success" pill> طلب مبيع</Badge>
          if (row.farm_id)
              return <Badge color="danger" pill>طلب شراء</Badge>

      }
  },

  {
    name: 'التاريخ',
    selector: row => row.created_at
},
{
    name: 'الكمية الكلية',
    selector: row => row.total_amount
},
{selector: (row) => renderModalCell(row),},
{
  selector: (row) => 
  
  <Badge className='cursor-pointer'  color="success" onClick={() => handleConfirmText(row.id)}>
  <Check size={10}  />
&nbsp;قبول
    </Badge>
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
        data={data.sales_purchasing_requset_detail}
        columns={columns2}
        className="react-dataTable"
        noHeader
      />
    </div>
  );

  const store = useSelector((state) => state.ceo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequests());
  }, [dispatch, store.requests.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.requests]);

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



 

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = store.requests.filter((item) => {
        const startsWith =
          item.created_at.toString().toLowerCase().startsWith(value.toLowerCase()) ||
          item.total_amount.toString().startsWith(value);

        const includes =
          item.created_at.toString().toLowerCase().includes(value.toLowerCase()) ||
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
      title: "هل تريد قبول الطلب ؟",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "قبول",
      cancelButtonText: "إالغاء",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        dispatch(AcceptRequest(id));
        dispatch(getRequests());
      }
    });
  };

  const hasData = searchValue.length
    ? filteredData.length > 0
    : store.requests.length > 0;

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
            الطلبات
              <br />
              <br />
            </h2>
            <h3 className="text-danger">
              {" "}
              {store.requests == ""
                ? null
                : `عدد الطلبات : ${
                    searchValue.length
                      ? filteredData.length
                      : store.requests.length
                  }`}
            </h3>
          </CardTitle>
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
              disabled={store.requests == ""}
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
              data={searchValue.length ? filteredData : store.requests}
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
