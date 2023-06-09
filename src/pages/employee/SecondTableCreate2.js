import React, { useState } from "react";
import { Table } from "../../styles/Styles";

export default function SecondTableCreate2() {
  const [divs, setDivs] = useState([
    { id: 1, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 2, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 3, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 4, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 5, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 6, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 7, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 8, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 9, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 10, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 11, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 12, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 13, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 14, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
    { id: 15, values: ["", "", "", "", "", "", "", "", "", "", "", "", ""] },
  ]);

  function handleAddDiv() {
    const newId = divs.length + 1;
    const newValues = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    setDivs([...divs, { id: newId, values: newValues }]);
    const tableWrapper = document.querySelector(".c2");
    const scrollHeight = tableWrapper.scrollHeight;
    const clientHeight = tableWrapper.clientHeight;
    if (scrollHeight > clientHeight) {
      //tableWrapper.scrollTop = scrollHeight - clientHeight;
      setTimeout(() => {
        tableWrapper.scrollTo({ top: scrollHeight, behavior: "smooth" });
      }, 100);
    }
  }

  function handleInputChange(divId, inputIndex, newValue) {
    setDivs((prevDivs) => {
      const divToUpdateIndex = prevDivs.findIndex((div) => div.id === divId);
      const updatedDiv = { ...prevDivs[divToUpdateIndex] };
      updatedDiv.values[inputIndex] = newValue;
      const updatedDivs = [...prevDivs];
      updatedDivs[divToUpdateIndex] = updatedDiv;
      return updatedDivs;
    });
  }

  return (
    <Table>
      <table>
        <thead>
          <tr>
            <th>
              <i className="fa-solid fa-circle-plus" onClick={handleAddDiv}></i>
            </th>
            <th>Item</th>
            <th>Defecto</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8 </th>
            <th>9 </th>
            <th>10 </th>
            <th>11 </th>
            <th>12 </th>
            <th>Total </th>
          </tr>
        </thead>
        <tbody>
          {divs.map((div) => (
            <tr key={div.id}>
              <td></td>

              <td>{div.id}</td>

              <td>
                <input
                  value={div.values[1]}
                  onChange={(e) => handleInputChange(div.id, 1, e.target.value)}
                  style={{ minWidth: "300px" }}
                />
              </td>
              <td>
                <input
                  value={div.values[2]}
                  onChange={(e) => handleInputChange(div.id, 2, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[3]}
                  onChange={(e) => handleInputChange(div.id, 3, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[4]}
                  onChange={(e) => handleInputChange(div.id, 4, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[5]}
                  onChange={(e) => handleInputChange(div.id, 5, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[6]}
                  onChange={(e) => handleInputChange(div.id, 6, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[7]}
                  onChange={(e) => handleInputChange(div.id, 7, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[8]}
                  onChange={(e) => handleInputChange(div.id, 8, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[9]}
                  onChange={(e) => handleInputChange(div.id, 9, e.target.value)}
                />
              </td>
              <td>
                <input
                  value={div.values[10]}
                  onChange={(e) =>
                    handleInputChange(div.id, 10, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={div.values[11]}
                  onChange={(e) =>
                    handleInputChange(div.id, 11, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={div.values[12]}
                  onChange={(e) =>
                    handleInputChange(div.id, 12, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={div.values[13]}
                  onChange={(e) =>
                    handleInputChange(div.id, 13, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  value={div.values[14]}
                  onChange={(e) =>
                    handleInputChange(div.id, 14, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
}
