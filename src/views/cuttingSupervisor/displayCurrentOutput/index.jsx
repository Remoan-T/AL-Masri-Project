// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOutput ,getCuttingDropdown} from "../store";
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
              value={row.type_id}
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
      name: "الوزن",
      selector: (row) => row.weight,
      sortable: false,
    },
    {
        name: "النوع",
        selector: (row) => row.output_types.type,
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
          const isEnabled = rowEnabledState[row.type_id];
          const typeId = row.type_id;
    
          const handleInputChange = (event, typeId) => {
            const { value } = event.target;
          
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
              outline: 'none'}}
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
      updatedData = store.SellingPortOffer.filter((item) => {
        const startsWithPort =
          item.selling_port &&
          item.selling_port.name.toLowerCase().startsWith(value.toLowerCase());
        const includesPort =
          item.selling_port &&
          item.selling_port.name.toLowerCase().includes(value.toLowerCase());

        const otherStart = item.total_amount.toString().startsWith(value);
        const otherIncludes = item.total_amount.toString().includes(value);

        if (startsWithPort || includesPort || otherStart || otherIncludes) {
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
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [rowEnabledState, setRowEnabledState] = useState({});
  const [weightValues, setWeightValues] = useState({});
  const [check, setCheck] = useState(false);
  const [outputChoice, setOutputChoice] = useState(null);
  

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentOutput());
    dispatch(getCuttingDropdown());
    console.log(store.cuttingDropdown)
  }, [dispatch, store.currentOutput.length, store.cuttingDropdown.length]);

  useEffect(() => {
    const delay = 500;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [store.currentOutput]);

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
    : store.currentOutput.length > 0;


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
            output_cutting_detail_id: typeId,
            weight: isNaN(weight) ? 0 : weight,
          };
        });
      
        const requestBody = {
          details,
          outputChoice: outputChoice ? outputChoice.value : null,
        };
      
        axios
          .post("http://127.0.0.1:8000/cutting-supervisor-api/direct-cutting-to", requestBody)
          .then((response) => {
            // Handle success response
            console.log("POST request successful:", response.data);
          })
          .catch((error) => {
            // Handle error
            console.log("Error in POST request:", error);
          });
      };



  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          {" "}
          <h2>
            مخرجات قسم التقطيع
            <br />
            <br />
            <h3 className="text-success">
              {" "}
              {store.currentOutput == ""
                ? null
                : `عدد المخرجات : ${
                    searchValue.length
                      ? searchData.length
                      : store.currentOutput.length
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
              disabled={store.currentOutput == ""}
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
            disabled={store.currentOutput == ""}
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
                          isDisabled={!check}
                          options={store.cuttingDropdown.map((option) => ({
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
            data={searchValue.length ? searchData : store.currentOutput}
            columns={columns}
            className="react-dataTable"
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
          <div>
          <div className="position-relative py-3"style={{marginLeft: '20px'}}>
        
          <button className="btn btn-primary position-absolute bottom-0 end-0 mb-2 w-25"
          onClick={handleButtonClicked}
          disabled={!check || !outputChoice}
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
