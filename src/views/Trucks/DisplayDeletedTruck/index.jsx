// ** Table Columns
import { useDispatch, useSelector } from 'react-redux'
import { getDeletedTrucks, RestoreTruck } from '../store'
import { useEffect, useState } from 'react'
// ** Third Party Components
import { ChevronDown, Share, Grid,Search } from 'react-feather'
import DataTable from 'react-data-table-component'


//styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'




import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";


// ** Reactstrap Imports
import { Card, CardHeader, CardTitle,Row, Col, Label, Input,
  DropdownMenu, DropdownItem, DropdownToggle,UncontrolledButtonDropdown,
InputGroup,InputGroupText} from 'reactstrap'

const DataTablesBasic = () => {
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
            name: "اسم الشاحنة",
            selector: (row) => row.name,
          },
          {
            name: "النوع",
            selector: (row) => row.model,
          },
          {
            name: "سعة التحميل",
            selector: (row) => row.storage_capacity,
          },
          {
              name: "رقم اللوحة",
              selector: (row) => row.truck_number,
            },
            {
              name: "المحافظة",
              selector: (row) => row.governorate_name,
            },
        {
            
            cell: row => (
                <button className='btn-sm btn btn-success' onClick={() => handleConfirmText(row.id)}>استرجاع</button>
            )
        }
    ]
    const store = useSelector(state => state.truck)
    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showNoDataMessage, setShowNoDataMessage] = useState(false);

    
    
    useEffect(() => {
        dispatch(getDeletedTrucks())
    }, [dispatch, store.deletedTrucks.length])

    useEffect(() => {
      const delay = 500;
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);
  
      return () => {
        clearTimeout(timer);
      };
    }, [store.deletedTrucks]);
  
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



    const handleConfirmText = (id) => {
        return MySwal.fire({
          title: "هل تريد استرجاع الشاحنة ؟",
          text: "",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "استرجاع الشاحنة ",
          cancelButtonText: "إالغاء",
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-outline-danger ms-1",
          },
          buttonsStyling: false,
        }).then(function (result) {
          if (result.value) {
            dispatch(RestoreTruck(id));
            dispatch(getDeletedTrucks())
          }
        });
      };


      const handleExport = () => {
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const fileName ="الشاحنات المحذوفة";
        const formattedData = store.deletedTrucks.map(
          ({ id, name, model, truck_number, storage_capacity, governorate_name }) => ({
            المعرف: id,
            الاسم: name,
            الموديل:model,
            رقم_اللوحة: truck_number,
            سعة_الشاحنة: storage_capacity,
            المحافظة: governorate_name
    
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
          updatedData = store.deletedTrucks.filter((item) => {
            const startsWith =
              item.name.toLowerCase().startsWith(value.toLowerCase()) ||
              item.governorate_name.toLowerCase().startsWith(value.toLowerCase())||
              item.truck_number.toString().startsWith(value) ||
              item.model.toLowerCase().startsWith(value.toLowerCase())||
              item.storage_capacity.toString().startsWith(value.toLowerCase())
    
    
            const includes =
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.governorate_name.toLowerCase().includes(value.toLowerCase())||
            item.truck_number.toString().includes(value) ||
            item.model.toLowerCase().includes(value.toLowerCase())||
            item.storage_capacity.toString().includes(value.toLowerCase())
    
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
      : store.deletedTrucks.length > 0;
  
    return (
        <Card className='overflow-hidden'>
            <CardHeader>
            <CardTitle >
          {" "}
          <h2>الشاحنات المحذوفة<br/><br/><h3 className="text-danger">{store.deletedTrucks == ""
                ? null
                : `عدد الشاحنات المحذوفة : ${
                    searchValue.length
                      ? filteredData.length
                      : store.deletedTrucks.length
                  }`}</h3></h2>{" "}
        </CardTitle>
        <div className="d-flex mt-md-0 mt-1">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" caret outline disabled={store.deletedTrucks == ''}>
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
            <InputGroup className='mb-2'>
        <InputGroupText>
          <Search size={14} />
        </InputGroupText>
        <Input
            className="dataTable-filter"
            type="text"
            onChange={handleFilter}
            id="search-input"
            value={searchValue}
            disabled={store.deletedTrucks == ''}
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
            <div className='react-dataTable'>
                <DataTable
                    noHeader
                    pagination
                    data={searchValue.length ? filteredData : store.deletedTrucks}
                    columns={columns}
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
            </div>
            ) : showNoDataMessage ? (
              <div className="text-center my-3 text-danger h3">لا توجد بيانات</div>
            ) : null}
        </Card>
    )
}

export default DataTablesBasic
