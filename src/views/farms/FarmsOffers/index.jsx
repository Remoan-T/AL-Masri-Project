// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getOfferFarms, removeFarm } from '../store'
import { Fragment } from "react";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
  Col

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
  const [formModal, setFormModal] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [numberInputValue, setNumberInputValue] = useState(0);

  const columns = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },

    {
      name: 'اسم المزرعة',
      selector: row => row.farm.name
    },
    {
      name: 'الوزن الكلي',
      selector: 'total_amount'
    },
    ,
    {
      name: 'التاريخ',
      selector: 'created_at'
    },
    {
      name: "Actions",
      selector: (row, index) => renderModalCell(row, index),
    },
  ];
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

  useEffect(() => {

    setFormModal(Array(store.OfferFarms.length).fill(false));
  }, [store.OfferFarms]);


  const handleModalToggle = (index) => {
    const updatedFormModal = [...formModal];
    updatedFormModal[index] = !updatedFormModal[index];
    setFormModal(updatedFormModal);
  };


  const renderModalCell = (row, index) => {
    const orders = row.detailpurchase_orders;

    const [checkboxValues, setCheckboxValues] = useState(
      orders.map((order) => order.type)
    );
    const [numberInputValue, setNumberInputValue] = useState(
      Array(orders.length).fill(0)
    );

    const handleCheckboxChange = (e, orderIndex) => {
      const updatedValues = [...checkboxValues];
      updatedValues[orderIndex] = e.target.checked ? orders[orderIndex].type : "";
      setCheckboxValues(updatedValues);

      if (e.target.checked) {
        console.log(orders[orderIndex].type);
      }
    };

    const handleNumberInputChange = (e, orderIndex) => {
      const updatedValues = [...numberInputValue];
      updatedValues[orderIndex] = e.target.value;
      setNumberInputValue(updatedValues);
    };
    const modalSubmit = async (data) => {

      // handleModalToggle(index)

    };

    return (
      <div>
        <Button
          color="primary"
          outline
          onClick={() => handleModalToggle(index)}
        >
          Login Form
        </Button>
        <Modal
          isOpen={formModal[index]}
          toggle={() => handleModalToggle(index)}
          className="modal-dialog-centered"
          size="lg"
        >
          <Form>
            <ModalHeader toggle={() => handleModalToggle(index)}>
              طلب من العرض
            </ModalHeader>
            <ModalBody>

              {orders.map((order, orderIndex) => {

                return (
                  <Fragment>
                    <Row key={orderIndex}>
                      <Col md={6}>
                        <FormGroup check className="py-1">
                          <Label check>
                            <Input
                              type="checkbox"
                              checked={checkboxValues[orderIndex] === order.type}
                              onChange={(e) => handleCheckboxChange(e, orderIndex)}
                            />
                            {order.type}
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="mb-0">
                          <Label className="form-label">الكمية</Label>
                          <Controller
                            name={`details.amount`}
                            control={control}
                            rules={{ required: true }}
                            // defaultValue={field.weight}
                            render={({ field }) => (
                              <Input
                                disabled={!checkboxValues[orderIndex]}
                                type="number"
                                placeholder="الكمية بال كغ"
                                {...field}

                                id={`details.${index}.weight`}



                              />


                            )}

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Fragment>

                )
              })}

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => modalSubmit()}>
                إرسال الطلب
              </Button>{" "}

            </ModalFooter>
          </Form>
        </Modal>

      </div>
    );
  };




  const handleExport = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "المنافذ المحذوفة";
    const formattedData = store.OfferFarms.map(
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
      updatedData = store.OfferFarms.filter((item) => {
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
    : store.OfferFarms.length > 0;




  return (
    <Fragment>
      {/* table rendering code... */}
      {columns.map((column, columnIndex) => {
        if (column.selector === "Actions") {
          return (
            <div key={columnIndex}>
              {renderModalCell(row, columnIndex)}
            </div>
          );
        }
        return null;
      })}
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
                {store.OfferFarms == ""
                  ? null
                  : `عدد المنافذ المحذوفة : ${searchValue.length
                    ? filteredData.length
                    : store.OfferFarms.length
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
              data={searchValue.length ? filteredData : store.OfferFarms}
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
    </Fragment>

  );

};

export default DataTablesBasic;
