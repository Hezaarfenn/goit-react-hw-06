import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact, selectContacts } from '../../redux/contactsSlice';

import styles from './ContactForm.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'En az 3 karakter olmalıdır.')
    .max(50, 'En fazla 50 karakter olmalıdır.')
    .required('Required'),
  number: Yup.string()
    .min(3, 'En az 3 karakter olmalıdır.')
    .max(50, 'En fazla 50 karakter olmalıdır.')
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    if (
      contacts.some(
        (contact) =>
          contact.name === values.name || contact.number === values.number,
      )
    ) {
      alert(`${values.name} is already in contacts.`);
      return;
    }
    dispatch(
      addContact({ id: Date.now(), name: values.name, number: values.number }),
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.label}>Name</label>
        <Field className={styles.input} type="text" name="name" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label className={styles.label}>Number</label>
        <Field className={styles.input} type="tel" name="number" />
        <ErrorMessage name="number" component="div" className={styles.error} />

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
