import React from "react";

const Checkbox = ({ type, id, callback }) => {
  const handleClick = (e) => {
    callback(e, type, id);
  };
  return (
    <div className="checkbox-table">
      <input type="checkbox" className={`${type}`} name="" value="" onClick={handleClick} />
    </div>
  );
};

export default Checkbox;
