import React, { useEffect, useState } from "react";

const Select = ({ children, value, callback, name, id }) => {
  const [visible, setVisible] = useState(false);
  const handleChange = (e) => {
    let val = e.target.value;
    if (val === "O") {
      setVisible(true);
    } else {
      setVisible(false);
    }
    callback(e);
    //console.log(e.target.value);
  };
  const inputChange = (e) => {
    callback(e, "O");
  };
  useEffect(() => {
    const form = document.querySelector("form");
    const selects = document.querySelectorAll("select");
    if (visible === true) {
        console.log(selects[1]);
      form.classList.add("ex-m");
    } else {
      form.classList.remove("ex-m");
    }
    return () => {};
  }, [visible]);
  return (
    <>
      <select
        id={id}
        name={name}
        required
        value={value}
        onChange={(e) => handleChange(e)}
      >
        {children}
      </select>
      {visible === true ? (
        <fieldset>
          <legend>Especifica:</legend>
          <input
            id={id}
            name={`${name}-others`}
            type="text"
            placeholder=""
            className="other-input"
            onChange={(e) => inputChange(e)}
          />
        </fieldset>
      ) : (
        ""
      )}
    </>
  );
};

export default Select;
