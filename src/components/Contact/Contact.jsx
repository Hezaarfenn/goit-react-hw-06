import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

import styles from './Contant.module.css';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.contact}>
      <div>
        <p>{name}</p>
        <p>{number}</p>
      </div>
      <button
        className={styles.deleteBtn}
        type="button"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
