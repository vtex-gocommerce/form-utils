# Form Utils

Build forms in React, without the tears. Actually it's just a VTEX IO way to use [Formik](https://github.com/jaredpalmer/formik). Use [Yup](https://github.com/jquense/yup) to validate  your fields.

## Configuration 

You may just add `gocommerce.form-utils` to your app dependencies list and you are ready to go. 

For the `Form` component the accepted props are the following:

| Prop name    | Type            | Description    | Default value                                                                                                                               |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | 
| `id`      | `string`       | Form id         | ``        |
| `onSubmit`      | `function`       | Function called on form submit         | ``        |
| `validationSchema`      | `Schema`       | Yup schema         | ``        |
| `initialValues`      | `object`       | Object with initial values         | ``        |

This app is based on the [vtex](https://styleguide.vtex.com/) and [gocommerce](https://vtex-gocommerce.github.io/styleguide/) styleguides. The available inputs are:

- Input
- InputCurrency
- InputTag
- Checkbox
- RadioButton
- Toggle
- Textarea
- Select
- DatePicker
- SubmitButton

## Usage

```js
<Form
  id="my-form-id"
  onSubmit={(values) => console.log(values)}
  validationSchema={yup.object().shape({
    name: yup.string().required("Name cannot be empty"),
    age: yup.number().required("Age cannot be empty"),
  })}
  initialValues={{
    name: "Finn The Human",
    age: 12,
  }}
>
  <Form.Input
    id="name"
    name="name"
    label="What's your name?"
  />

  <Form.Input
    id="age"
    name="age"
    type="number"
    label="How old are you?"
  />
</Form>
```
