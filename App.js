import PopUp from "./components/PopUp";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearchValue] = useState([""]);
  const buttonId = useRef();
  const [contactsCopy, setContactsCopy] = useState([]);

  useEffect(() => {
    if (searchValue !== "") {
      const filtered = contacts.filter((e) => e?.name.includes(searchValue));
      setContacts(filtered);
    } else {
      setContacts(contactsCopy);
    }
  }, [searchValue]);

  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const removeItem = (event) => {
    let name = event.name;
    var result = window.confirm(
      "Are you sure you want to remove " + name + "out of your contacts?"
    );
    if (result) {
      const newContacts = contacts.filter(
        (item) => item.id !== event.target.value
      );

      setContacts(newContacts);
      setContactsCopy(contacts);
      console.log(newContacts);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Phone Book</h1>

      <input type="text" onChange={(e) => setSearchValue(e.target.value)} />

      <button className="add-btn" onClick={() => setButtonPopup(true)}>
        ADD CONTACT
      </button>

      <div className="PhoneList">
        <>
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th></th>
              </tr>
            </thead>

            {contacts.length > 0 && (
              <tbody className="contact">
                {contacts.map((contacts, i) => {
                  return (
                    <tr key={i}>
                      <td>{contacts.name}</td>
                      <td>{contacts.number}</td>
                      <td>
                        <button
                          className="remove-btn"
                          onClick={(e) => removeItem(e)}
                          ref={buttonId}
                          value={contacts.id}
                        >
                          remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </>
      </div>
      <PopUp
        setContacts={setContacts}
        setContactsCopy={setContactsCopy}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      ></PopUp>
    </div>
  );
}

export default App;
