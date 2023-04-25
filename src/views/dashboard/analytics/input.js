import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

import { Button, Label, FormText, Form, Input } from 'reactstrap'
 function MyForm() {
  const { register, handleSubmit, control } = useForm();
  const { fields: outerFields, append: outerAppend } = useFieldArray({
    name: 'outerArray',
    control,
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('/my-api-endpoint', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {outerFields.map((outerField, outerIndex) => (
        <div key={outerField.id}>
          <Input
            {...register(`outerArray[${outerIndex}].name`)}
            defaultValue={outerField.name}
          />
          <Button
            type="button"
            onClick={() => {
              outerAppend({
                name: '',
                innerArray: [{ value: '' }],
              });
            }}
          >
            Add Inner
          </Button>
          <InnerArrayFields
            control={control}
            name={`outerArray[${outerIndex}].innerArray`}
          />
        </div>
      ))}
      <Button type="submit">Submit</Button>
    </Form>
  );
}

function InnerArrayFields({ control, name }) {
  const { fields, append } = useFieldArray({
    name,
    control,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Input
            {...control.get(`[${name}][${index}].value`)}
            defaultValue={field.value}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          append({ value: '' });
        }}
      >
        Add Value
      </Button>
    </div>
  );
}
export default MyForm