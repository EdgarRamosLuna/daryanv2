import React, { useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
const Create = () => {
  
  const {data, setData} = useContext(MainContext)
  console.log(data);
  return (
    <div class="container">
        <div className="title">
            <h3>Crear un nuevo reporte</h3>
            <br/>
        </div>
      <form>
        <div className="form-container">
          <label for="data">Dato1:</label>
          <input
            type="text"
            id="data"
            name="data"
            placeholder="Datos"
            required
            value={data.data}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value, 
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data2">Dato2:</label>
          <input
            type="text"
            id="data2"
            name="data2"
            placeholder="Datos"
            required
            value={data.data2}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data3">Dato3:</label>
          <input
            type="text"
            id="data3"
            name="data3"
            placeholder="Datos"
            required
            value={data.data3}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data4">Dato4:</label>
          <input
            type="text"
            id="data4"
            name="data4"
            placeholder="Datos"
            required
            value={data.data4}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data5">Dato5:</label>
          <input
            type="text"
            id="data5"
            name="data5"
            placeholder="Datos"
            required
            value={data.data5}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data6">Dato6:</label>
          <input
            type="text"
            id="data6"
            name="data6"
            placeholder="Datos"
            required
            value={data.data6}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data7">Dato7:</label>
          <input
            type="text"
            id="data7"
            name="data7"
            placeholder="Datos"
            required
            value={data.data7}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data8">Dato8:</label>
          <input
            type="text"
            id="data8"
            name="data8"
            placeholder="Datos"
            required
            value={data.data8}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data9">Dato9:</label>
          <input
            type="text"
            id="data9"
            name="data9"
            placeholder="Datos"
            required
            value={data.data9}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data10">Dato10:</label>
          <input
            type="text"
            id="data10"
            name="data10"
            placeholder="Datos"
            required
            value={data.data10}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data11">Dato11:</label>
          <input
            type="text"
            id="data11"
            name="data11"
            placeholder="Datos"
            required
            value={data.data11}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="form-container">
          <label for="data12">Dato12:</label>
          <input
            type="text"
            id="data12"
            name="data12"
            placeholder="Datos"
            required
            value={data.data12}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.dataset.name || e.target.name]: e.target.value,
              })
            }
          />
        </div>
        {/*
        <label for="subject">Subject:</label>
        <select id="subject" name="subject">
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
        </select>

        <label for="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          required
        ></textarea>*/}

       
      </form>
    </div>
  );
};

export default Create;
