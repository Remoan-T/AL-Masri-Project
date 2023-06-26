// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    Form,
    Label,
    Input,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    InputGroup,
    InputGroupText
} from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import ToastDone from '@src/assets/toast/toastDone.component'
import ToastError from '@src/assets/toast/toastError.component'
import axios from 'axios'
import toast from 'react-hot-toast'
// ** Icons Imports
import { useParams } from 'react-router-dom'

import { Truck, FileText, Package, Map, Hash } from 'react-feather'
const defaultValues = {

    tot_weight: '',
    empty_weight: '',

}


const VerticalFormIcons = () => {
    const { id } = useParams()
    console.log(id)
    const {
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
        formState
    } = useForm({
        defaultValues,
        mode: "onChange"
    })

    // ** Function to handle form submit
    const onSubmit = async (data) => {

        try {
            const res = await axios.post(`http://127.0.0.1:8000/libra-api/add-weight-after-arrival-detection/${id}`, {
                tot_weight: data.tot_weight,
                empty_weight: data.empty_weight,

            }, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.accessToken}`
                }
            })
            if(res.data.status == true) toast(t => (
                <ToastDone position="top-right" t={t} msg={'تم إضافة الحمولة !!'} />
            ))

            reset()

        } catch (error) {

            if (error.code == 'ERR_NETWORK') toast(t => (
                <ToastError t={t} err={'مشكلة بالاتصال !!'} />
            ))
            if (error.code == 'ERR_BAD_REQUEST') toast(t => (
                <ToastError t={t} err={'الرجاؤ إدخال مركبة'} />
            ))

            console.log(error)

        }


    }


    return (
        <div >
            <Card className='mx-5 px-2'>
                <CardHeader>
                    <CardTitle tag='h4'>إضافة حمولة</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm='12'>
                                <Label className='form-label' for='IconsMobile'>
                                    وزن الشاحنة مع الحمولة                </Label>
                                <InputGroup className='input-group-merge mb-1'>
                                    <InputGroupText>
                                        <Package size={15} />
                                    </InputGroupText>
                                    <Controller
                                        name='tot_weight'
                                        control={control}
                                        rules={{
                                            required: true,
                                            min: {
                                                value: 1,
                                                message: 'السعة غير صحيحة'
                                            },
                                            maxLength: {
                                                value: 5,
                                                message: 'تأكد من السعة'
                                            }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                type='number'
                                                id='tot_weight'
                                                placeholder='وزن الشاحنة مع الحمولة'
                                                required
                                                {...field}
                                            />)}
                                    />
                                </InputGroup>
                                {errors.storage_capacity && <p className='text-danger'> {errors.storage_capacity.message} </p>}
                            </Col>

                            <Col sm='12'>
                                <Label className='form-label' for='IconsPassword'>
                                    وزن الشاحنة مفرغة
                                </Label>
                                <InputGroup className='input-group-merge mb-1'>
                                    <InputGroupText>
                                        <Map size={15} />
                                    </InputGroupText>
                                    <Controller
                                        name='empty_weight'
                                        rules={{ required: true }}
                                        control={control}
                                        render={({ field }) => (
                                            <Input type='text'
                                                placeholder='وزن الشاحنة مفرغة '
                                                required
                                                maxLength={10}
                                                minLength={3}
                                                id='empty_weight'
                                                {...field}
                                            />)}
                                    />
                                </InputGroup>
                            </Col>

                            <Col>

                                <div className='d-flex justify-content-center'>
                                    <Button disabled={!formState.isValid} className='btn-md w-75 ' color='primary' type='submit' >
                                        إضافة
                                    </Button>
                                </div>


                            </Col>

                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
export default VerticalFormIcons



