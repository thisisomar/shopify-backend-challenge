import * as Yup from 'yup';

export const ItemSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  quantity: Yup.number().required('Quantity is required'),
});
