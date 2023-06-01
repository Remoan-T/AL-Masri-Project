import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Row, Col, Card, CardHeader, CardBody, Form, Label, Input, Button } from 'reactstrap'
import { X, Plus } from "react-feather";

export default ({ nestIndex, control }) => {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `details[${nestIndex}].detection_details`
    });

    return (
        <div>
            {fields.map((item, k) => {
                return (
                    <div key={item.id} >
                        <Row>
                            <Col md={5} >
                                <Label>عدد الاقفاص</Label>
                                <Controller
                                    name={`details[${nestIndex}].detection_details[${k}].num_cages`}
                                    control={control}
                                    defaultValue={item.field2}
                                    required
                                    render={({ field }) => (
                                        <Input
                                            required
                                            type="number"
                                            placeholder="الكمية بال كغ"
                                            {...field}

                                            id={`details[${nestIndex}].detection_details[${k}].num_cages`}
                                        />
                                    )}

                                />
                            </Col>
                            <Col md={5} >
                                <Label>مجموعة</Label>
                                <Controller
                                    name={`details[${nestIndex}].detection_details[${k}].group_weight`}
                                    control={control}
                                    defaultValue={item.field2}
                                    required
                                    render={({ field }) => (
                                        <Input
                                            required
                                            type="number"
                                            placeholder="الكمية بال كغ"
                                            {...field}

                                            id={`details[${nestIndex}].detection_details[${k}].group_weight`}
                                        />
                                    )}

                                />

                            </Col>

                            <Col md={2} className="mt-2">
                                <Button
                                    color="danger"
                                    className="text-nowrap px-1"
                                    type="button"
                                    onClick={() => remove(k)}
                                    outline
                                >
                                    <X size={14} className="me-50" />
                                    <span>حذف الطلب</span>
                                </Button>
                            </Col>
                        </Row>
                    </div>

                );
            })}
            <Button
                className="btn-icon ml-5 mt-2"
                color="primary"
                type="button"
                onClick={() =>
                    append({
                        group_weight: "",
                        num_cages: ""
                    })
                }
            >
                <Plus size={14} />
                <span className="align-middle ms-25">طلب جديد</span>
            </Button>
        </div>
    );
};
