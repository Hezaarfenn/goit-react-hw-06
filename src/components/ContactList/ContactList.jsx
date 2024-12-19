import { useSelector } from 'react-redux';
import { selectContacts } from '../../redux/contactsSlice.js';
import { selectNameFilter } from '../../redux/filtersSlice.js';
import Contact from '../Contact/Contact.jsx';
import { useMemo } from 'react';

import styles from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const nameFilter = useSelector(selectNameFilter);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase()),
      ),
    [contacts, nameFilter],
  );

  if (filteredContacts.length === 0) return <p>No contacts found</p>;

  return (
    <ul className={styles.list}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </ul>
  );
};

export default ContactList;
