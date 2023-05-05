import React from "react";
import "./PopUp.css";
import { useState, useRef } from "react";

function PopUp(props) {
  const NumberInput = useRef();
  const NameInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueNum = NumberInput.current.value;
    const valueName = NameInput.current.value;
    const id = "NC" + Math.random();
    props.setContacts((prevState) => [
      ...prevState,
      { name: valueName, number: valueNum, id: id },
    ]);

    props.setContactsCopy((prevState) => [
      ...prevState,
      { name: valueName, number: valueNum, id: id },
    ]);

    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={handleSubmit}>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            Cancel
          </button>
          <button className="done-btn" type="submit">
            Done
          </button>
          <h2 className="title-alter"> New Contact </h2>
          <input
            type="text"
            name="Contact name"
            placeholder="Name.."
            ref={NameInput}
          />
          <input
            type="tel"
            name="Phone number"
            placeholder="Number.."
            ref={NumberInput}
          />
        </form>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUp;
