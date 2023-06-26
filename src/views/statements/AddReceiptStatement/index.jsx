import { useForm, useFieldArray, Controller } from "react-hook-form";
import NestedArray from "./nestedFieldArray";
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap'
import { X, Plus } from "react-feather";
import { getProducts, getRowMaterials } from "../../orders/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useParams } from 'react-router-dom'
import './style.css'
function MyForm() {
    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch();
    const [buy, setbuy] = useState([]);
    const store3 = useSelector((state) => state.order);

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            details: [{ row_material_id: "", detection_details: [] }]
        }
    });
    useEffect(() => {
        dispatch(getRowMaterials());
        setbuy(store3.buyMaterials);
    }, [dispatch, store3.buyMaterials.length]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "details"
    });

    const onSubmit = async (data) => {
        const res = await axios.post(
            `http://127.0.0.1:8000/libra-api/add-poultry-reciept-detection/${id}`,
            {
                details: data.details,

            },
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.accessToken}`,
                },
            }
        );

        console.log(data);

    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div key={field.id} className="mx-3 my-3">
                    <Row >
                        <Col md={4} className='mb-md-0 mb-1' >
                            <Label className="form-label">النوع</Label>

                            <Controller
                                name={`details[${index}].row_material_id`}
                                control={control}
                                defaultValue={field.row_material_id}
                                id={`details.${index}.type`}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Row Material ID"
                                        {...field}
                                        classNamePrefix="select"
                                        className="react-select"
                                        isClearable
                                        required
                                        onChange={(selectedOption) => {
                                            if (
                                                selectedOption === null ||
                                                selectedOption === undefined
                                            ) {
                                                onChange(null);
                                            } else {
                                                onChange(selectedOption.value);
                                            }
                                        }}
                                        value={buy.find((option) => option.value === value)}
                                        options={buy.map((option) => ({
                                            value: option.id,
                                            label: option.name,
                                        }))}
                                    />
                                )}
                            />

                        </Col>
                        <Col md={4} className='mb-md-0 mb-1'>
                            <NestedArray nestIndex={index} {...{ control }} />
                        </Col>

                        <Col md={4} className="mt-2 mr-10">
                            <Button

                                color="danger"
                                className="text-nowrap px-1 mr-10 cell"
                                type="button"
                                onClick={() => remove(k)}
                                outline
                            >
                                <X size={14} />
                                <span>حذف سطر</span>
                            </Button>
                        </Col>
                    </Row>
                </div>
            ))}
            <Button
                type="button"
                color='primary'
                onClick={() =>
                    append(
                        { row_material_id: "", detection_details: [] },

                    )
                }
            >
                اضافة سطر
            </Button>
            <br />
            <br />
            <br />
            <Button className='btn-md w-75 ' color='primary' type='submit' >
                إضافة
            </Button>
        </Form>
    );
}

export default MyForm;
