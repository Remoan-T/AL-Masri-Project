// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Input, Label } from 'reactstrap'

const TextareaFloatingLabel = ({title,Id,Name,place,info}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>{title}</CardTitle>
      </CardHeader>

      <CardBody>
        <CardText className='mb-3'>
          {info}
        </CardText>
        <div className='form-floating mt-2'>
          <Input
            type='textarea'
            name={Name}
            id={Id}
            placeholder={place}
            style={{ minHeight: '100px' }}
          />
          <Label className='form-label' for='floating-textarea'>
            {place}
          </Label>
        </div>
      </CardBody>
    </Card>
  )
}
export default TextareaFloatingLabel
