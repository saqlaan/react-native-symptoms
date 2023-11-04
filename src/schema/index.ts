import * as Yup from 'yup';

export const SymptomFormSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Name is Required'),
  date: Yup.date().required('Date is required'),
  severity: Yup.string().required('Severity is required'),
  description: Yup.string(),
});
