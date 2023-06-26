// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getManufactoringDropdown ,getCurrentManufacturingOutput } from "../store";
import { useEffect, useState } from "react";
// ** Third Party Components
import { Share, Grid, Search } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { selectStyles } from "../../../assets/react-select/scrollbar.styles";
import { customNoOptionsMessage } from "../../../assets/react-select/react-selectMod";
import toast from 'react-hot-toast'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'


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
} from "reactstrap";


const DataTablesBasic = () => {
  const columns = [
    {
        name: "تحديد",
        cell: (row) => {
          const handleCheckboxChange = (event) => {
            const { value, checked } = event.target;
            setCheck(!check)
            setRowEnabledState((prevState) => ({
              ...prevState,
              [value]: checked,
            }));
          };
      
          return (
            <Input
              type="checkbox"
              value={row.id}
              onChange={handleCheckboxChange}
              
             
            />
          );
        },
      },
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "النوع",
      selector: (row) => row.output_types.type,
      sortable: false,
    },
    {
      name: "الوزن",
      selector: (row) => `${row.weight} كغ`,
      sortable: false,
    },
    
       {
      name: "تاريخ الإضافة",
      selector: (row) => row.created_at,
      sortable: false,
    },
    {
        name: "الوزن المطلوب",
        cell: (row) => {
          const isEnabled = rowEnabledState[row.id];
          const typeId = row.id;
    
          const handleInputChange = (event, typeId) => {
            const { value } = event.target;  
            setInputValue(value.toString().length)       
            setWeightValues((prevWeightValues) => ({
              ...prevWeightValues,
              [typeId]: value,
            }));
          };
    
          return (
            <Input
              type="number"
              disabled={!isEnabled}
              value={weightValues[typeId] || ""}
              onChange={(event) => handleInputChange(event, typeId)}
              style={{border: 'none',
              }}
              placeholder="ادخل الوزن المطلوب"
              styles={{'::placeholder': { /* Chrome, Firefox, Opera, Safari 10.1+ */
              color: 'red',
              opacity: '1' /* Firefox */
            }}}
            />
          );
        },
        sortable: false,
      },

  ];




  const handleExport = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "مخرجات التصنيع الحالية";
    const formattedData = store.currentManufacturingOutput.map(
      ({
        weight,
        output_types,
        created_at,
      }) => ({
        النوع: output_types.type,
        الوزن: `${weight} كغ`,
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
      updatedData = store.currentManufacturingOutput.filter((item) => {
        const startsWith =
          item.output_types.type.toLowerCase().startsWith(value.toLowerCase()) ||
          item.weight.toString().startsWith(value)

        const includes =
        item.output_types.type.toLowerCase().includes(value.toLowerCase()) ||
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

  const store = useSelector((state) => state.manufacturing);

  const [searchValue, setSearchValue] = useState("");
  // const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [rowEnabledState, setRowEnabledState] = useState({});
  const [weightValues, setWeightValues] = useState({});
  const [check, setCheck] = useState(false);
  const [outputChoice, setOutputChoice] = useState(null);
  const [inputValue, setInputValue] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  
  

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentManufacturingOutput());
    dispatch(getManufactoringDropdown());
    console.log(store.cuttingDropdown)
  }, [dispatch, store.currentManufacturingOutput.length, store.manufactoringDropdown.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.currentManufacturingOutput]);

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
    ? filteredData.length > 0
    : store.currentManufacturingOutput.length > 0;


    const handleOutputChoiceChange = (selectedOption) => {
        setOutputChoice(selectedOption);
      };


    const handleButtonClicked = () => {
        const selectedRows = Object.entries(rowEnabledState)
          .filter(([, checked]) => checked)
          .map(([typeId]) => typeId);
      
        const details = selectedRows.map((typeId) => {
          const weight = parseFloat(weightValues[typeId]);
      
          return {
            output_manufactoring_detail_id: typeId,
            weight: isNaN(weight) ? 0 : weight,
          };
        });
      
        const requestBody = {
          details,
          outputChoice: outputChoice ? outputChoice.value : null,
        };
      
        axios
          .post("http://127.0.0.1:8000/manufacturing-supervisor-api/direct-manufactoring-to", requestBody)
          .then((response) => {
            // Handle success response
            // console.log("POST request successful:", response.data);
            if(response.data.status == true)
            toast(t => (
              <ToastDone position="top-right" t={t} msg={response.data.message} />
            ))

            if(response.data.status == false)
            toast(t => (
              <ToastError position="top-right" t={t} err={response.data.message} />
            ))
          })
          .catch((error) => {
            // Handle error
            if (error.code == 'ERR_NETWORK') toast(t => (
              <ToastError t={t} err={'  مشكلة بالاتصال بقاعدة البيانات !!'} />
            ))
            if (error.code == 'ERR_BAD_REQUEST') toast(t => (
              <ToastError t={t} err={'الرجاء ملئ كامل البيانات بشكل صحيح !!'} />
            ))
            console.log("Error in POST request:", error);
          });
          
          dispatch(getCurrentManufacturingOutput());
      };



  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
          مخرجات التصنيع الحالية
          </h2>
            <br />
            <br />
            <h3 className="text-success">
              {" "}
              {store.currentManufacturingOutput == ""
                ? null
                : ` عدد المخرجات الحالية : ${
                  searchValue.length
                  ? filteredData.length
                      : store.currentManufacturingOutput.length
                  }`}
            </h3>
          
        </CardTitle>
                

        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle
              color="secondary"
              caret
              outline
              disabled={store.currentManufacturingOutput == ""}
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
          style={{marginLeft: '500px'}}
            className="dataTable-filter"
            type="text"
            onChange={handleFilter}
            id="search-input"
            value={searchValue}
            disabled={store.currentManufacturingOutput == ""}
            placeholder="البحث ..."
          />
        
            <Select
       
                          styles={selectStyles}
                          placeholder="اختر النوع"
                          theme={selectThemeColors}
                          classNamePrefix="select"
                          className="react-select w-25 mr-2"
                          isClearable
                          noOptionsMessage={customNoOptionsMessage}
                          // isDisabled={!check}
                          options={store.manufactoringDropdown.map((option) => ({
                            value: option.to,
                            label: option.to,
                          }))}
                          onChange={handleOutputChoiceChange}
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
            data={searchValue.length ? filteredData : store.currentManufacturingOutput}
            columns={columns}
            className="react-dataTable"
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          <div>
          <div className="position-relative py-3"style={{marginLeft: '20px'}}>
        
          <button className="btn btn-primary position-absolute bottom-0 end-0 mb-2 w-25"
          onClick={handleButtonClicked}
          disabled={!inputValue || !outputChoice}
          >إرسال</button>
          </div>
        
          </div>
        </div>
      ) : showNoDataMessage ? (
        <div className="text-center my-3 text-danger h3">لا توجد بيانات</div>
      ) : null}
    </Card>
  );
};

export default DataTablesBasic;
