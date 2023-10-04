import React from "react";
/**
 * Custom input for a report table
 * 03-10-2023
 * @param {string} value
 * @param {function} onChange
 * @param {function} onEnter
 * @param {number} id
 * @param {string} filaId
 * @param {number} index
 * @returns {JSX.Element}
 */
function CustomInput({ value, onChange, onEnter, id, filaId, index }) {
  /**
   * Handle the event of enter in the input
   * 03-10-2023 11:00
   * @param {event} e
   * @returns
   */
  const hanldeEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevenir la acción por defecto de Enter
      onEnter(filaId, index); // Llamar a tu función handleEnter
    }
  };
  return (
    <input
      value={value}
      onChange={(e) => onChange(filaId, index, e.target.value)}
      onKeyDown={hanldeEnter}
      id={id}
    />
  );
}

export default CustomInput;
