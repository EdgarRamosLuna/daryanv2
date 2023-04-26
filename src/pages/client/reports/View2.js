import React, { useContext, useState } from "react";
import Select from "../../../components/Select";
import { MainContext } from "../../../context/MainContext";
import { StyledForm } from "../../../styles/Styles";
import SecondTableCreate2 from "./SecondTableCreate2";

const View2 = () => {
  const { data, setData } = useContext(MainContext);
  //console.log(data);

  const handleSelect = (e, type) => {
    setData({
      ...data,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container">
        <div className="title">
          <h3>REPORTE POR HORAS</h3>
          <br />
        </div>
        <StyledForm>
          <div className="form-container">
            <label htmlFor="data">Planta:</label>
            <input
              type="text"
              id="data"
              name="data"
              placeholder=""
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
            <label htmlFor="data2">Proveedor:</label>
            <input
              type="text"
              id="data2"
              name="data2"
              placeholder=""
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
            <label htmlFor="data3">Fecha:</label>
            <input
              type="text"
              id="data3"
              name="data3"
              placeholder=""
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
            <label htmlFor="data4">No. de Reporte:</label>
            <input
              type="text"
              id="data4"
              name="data4"
              placeholder=""
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
            <label htmlFor="data5">Nombre de parte:</label>
            <input
              type="text"
              id="data5"
              name="data5"
              placeholder=""
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
            <label htmlFor="data6">Horas Trabajadas:</label>
            <input
              type="text"
              id="data6"
              name="data6"
              placeholder=""
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
            <label htmlFor="data7">Rate:</label>
            <input
              type="text"
              id="data7"
              name="data7"
              placeholder=""
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
            <label htmlFor="data8">Turno:</label>
            <select
              id="data8"
              name="data8"
              required
              value={data.data8}
              onChange={(e) =>
                setData({
                  ...data,
                  [e.target.dataset.name || e.target.name]: e.target.value,
                })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-container">
            <label htmlFor="data8">Tipo de servicio:</label>

            <Select
              id="data9"
              name="data9"
              value={data.data9}
              callback={handleSelect}
            >
              <option value="1">Selección</option>
              <option value="2">Retrabajo</option>
              <option value="O">Otros</option>
            </Select>
          </div>
          <div className="form-container">
            <label htmlFor="data10">Numero de parte:</label>
            <input
              type="text"
              id="data10"
              name="data10"
              placeholder=""
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
            <label htmlFor="data8">Control para el cliente:</label>
            <Select
              id="data11"
              name="data11"
              value={data.data11}
              callback={handleSelect}
            >
              <option value="1">Fecha de produccion</option>
              <option value="2">Fecha de aprobado</option>
              <option value="3">Serie</option>
              <option value="4">Lote</option>
              <option value="O">Otros</option>
            </Select>
          </div>

          {/*
        <label htmlFor="subject">Subject:</label>
        <select id="subject" name="subject">
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
        </select>

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          required
        ></textarea>*/}
        </StyledForm>
      </div>
      <div className="container c2">
        <SecondTableCreate2 />
      </div>
    </>
  );
};

export default View2;
