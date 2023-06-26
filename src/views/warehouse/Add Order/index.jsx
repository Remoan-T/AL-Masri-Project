// ** Table Columns
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOutput, getCuttingDropdown } from "../store";
import { useEffect, useState } from "react";
// ** Third Party Components
import { Share, Grid, Search } from "react-feather";
import { useParams } from 'react-router-dom'

import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import "@styles/react/libs/react-select/_react-select.scss";
import { getdisplaycommands, DisplayDropdawnCommandsContent } from "../store";

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
            name: "المادة",
            selector: (row) => row.warehouse.out_put__type__production.type,
        },
        {
            name: "الوزن الحالي",
            selector: (row) => row.cur_weight,
        },
        {
            name: "الوزن ",
            selector: (row) => row.command_weight,
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
                        style={{
                            border: 'none',
                        }}
                        placeholder="ادخل الوزن المطلوب"
                        styles={{
                            '::placeholder': { /* Chrome, Firefox, Opera, Safari 10.1+ */
                                color: 'red',
                                opacity: '1' /* Firefox */
                            }
                        }}
                    />
                );
            },
            sortable: false,
        },


    ];
    const store = useSelector((state) => state.warehouse);
    const { id } = useParams()

    const [rowEnabledState, setRowEnabledState] = useState({});
    const [weightValues, setWeightValues] = useState({});
    const [check, setCheck] = useState(false);
    const [inputValue, setInputValue] = useState(0);
    const [outputChoice, setOutputChoice] = useState(null);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getdisplaycommands());
    }, [dispatch, store.displaycommands.length]);

    useEffect(() => {
        dispatch(DisplayDropdawnCommandsContent());
    }, [dispatch, store.CommandContent.length]);
    console.log("🚀 ~ file: index.jsx:137 ~ DataTablesBasic ~ store.CommandContent:", store.CommandContent)




    const handleOutputChoiceChange = (selectedOption) => {
        setOutputChoice(selectedOption);
    };
    const SingleOrder = store.displaycommands.find((statement) => statement.id === Number(id));
    console.log(SingleOrder)
    if (!SingleOrder) {
        return null; // or return a loading indicator or error message
    }



    const handleButtonClicked = () => {
        const selectedRows = Object.entries(rowEnabledState)
            .filter(([, checked]) => checked)
            .map(([typeId]) => typeId);

        const details = selectedRows.map((typeId) => {
            const weight = parseFloat(weightValues[typeId]);

            return {
                command_detail_id: typeId,
                weight: isNaN(weight) ? 0 : weight,
            };
        });

        const requestBody = {
            details,
            from: outputChoice ? outputChoice.value : null,
        };
        axios
            .post(`http://127.0.0.1:8000/warehouse-supervisor-api/fill-command-from-production-manager/${id}`, requestBody)
            .then((response) => {
                // Handle success response
                // console.log("POST request successful:", response.data);
                if (response.data.status == true)
                    toast(t => (
                        <ToastDone position="top-right" t={t} msg={response.data.message} />
                    ))

                if (response.data.status == false)
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
    };



    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>
                    {" "}
                    <h2>
                        ملء أمر
                        <br />
                        <br />

                    </h2>{" "}
                </CardTitle>



            </CardHeader>
            <Row className="justify-content-end mx-0">
                <InputGroup className="mb-2">
                    <Select

                        styles={selectStyles}
                        placeholder="اختر النوع"
                        theme={selectThemeColors}
                        classNamePrefix="select"
                        className="react-select w-25 mr-2"
                        isClearable
                        noOptionsMessage={customNoOptionsMessage}
                        // isDisabled={!check}
                        options={store.CommandContent.map((option) => ({
                            value: option.warehouse_name,
                            label: option.warehouse_name,
                        }))}
                        onChange={handleOutputChoiceChange}
                    />



                </InputGroup>
            </Row>
            <div className="react-dataTable">
                <DataTable
                    noHeader
                    pagination
                    data={SingleOrder.command_details}
                    columns={columns}
                    className="react-dataTable"
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                />
                <div>
                    <div className="position-relative py-3" style={{ marginLeft: '20px' }}>

                        <button className="btn btn-primary position-absolute bottom-0 end-0 mb-2 w-25"
                            onClick={handleButtonClicked}

                        >إرسال</button>
                    </div>

                </div>
            </div>
        </Card>
    );
};

export default DataTablesBasic;
