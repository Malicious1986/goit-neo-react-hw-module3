import { useEffect, useState } from "react";

import "./App.css";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";

const getItemsFromStorage = () => {
    const contacts = localStorage.getItem("contacts");
    if (contacts) {
      return JSON.parse(contacts);
    }

    return [];
}

const setItemsToStorage = (items) => {
    localStorage.setItem("contacts", JSON.stringify(items));
}

function App() {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState(getItemsFromStorage);

  useEffect(() => {
    setItemsToStorage(contacts);
  }, [contacts]);
  
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const onAddContact = (contact) => {
    setContacts((prev) => [...prev, contact]);
  };
  const onDeleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />

      {contacts.length > 0 ? (
        <>
          <SearchBox value={filter} onChange={setFilter} />{" "}
          <ContactList contacts={filteredContacts} onDelete={onDeleteContact} />
        </>
      ) : (
        <h3>No records</h3>
      )}
    </div>
  );
}

export default App;
