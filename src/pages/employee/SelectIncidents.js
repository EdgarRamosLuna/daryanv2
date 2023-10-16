import React from "react";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { useState } from "react";
import { useEffect } from "react";

const SelectIncidents = ({ data, clause, selected }) => {

    const {setIncType, incType} = useContext(MainContext);    
    useEffect(() => {
      
      if(selected){
        console.log(selected)
        setDataC(selected)
      }    
    }, [selected])
    
    
    const [dataC, setDataC] = useState("");
    const handleChange = (e) => {
        const type = e.target.value;
        setIncType(prev => [...prev, {type, clause}])
        setDataC(type);
    }

    
  return (    
      <select value={dataC} onChange={handleChange}>
        <option value="0">Tipo</option>
        {          
          data.map((item, i) => {
            return (
              <option value={item.value} key={item.value+i}>
                {item.text}
              </option>
            );
          })
        }
      </select>    
  );
};

export default SelectIncidents;
