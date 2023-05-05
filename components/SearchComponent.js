import React, { useEffect } from "react";
import { useState, useRef } from "react";

const SearchComponent = ({ copy, contacts, setContacts }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setContacts(copy);

    const resultsArray = copy.filter((contact) =>
      contact.name.includes(e.target.value)
    );
    setContacts(resultsArray);
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleSearchChange} />
        <button>search</button>
      </form>
    </header>
  );
};

export default SearchComponent;
