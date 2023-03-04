import PopUp from "./components/PopUp";
import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [contacts, setContacts] = useState([]);

  const buttonId = useRef();

  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const removeItem = (event) => {
    const newContacts = contacts.filter(
      (contact) => contact.number !== event.target.value
    );

    setContacts(newContacts);
    console.log(newContacts);
  };

  return (
    <div className="App">
      <h2>Phone Book</h2>

      <button className="add-btn" onClick={() => setButtonPopup(true)}>
        ADD CONTACT
      </button>

      <div className="PhoneList">
        <>
          {contacts.length > 0 && (
            <div className="contact">
              {contacts.map((contacts, i) => {
                return (
                  <div key={i}>
                    {
                      <p>
                        Name: {" " + contacts.name} <br /> Number:
                        {" " + contacts.number}
                      </p>
                    }
                    <button
                      onClick={(e) => removeItem(e)}
                      ref={buttonId}
                      value={contacts.number}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      </div>
      <PopUp
        setContacts={setContacts}
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
      ></PopUp>
    </div>
  );
}

export default App;
