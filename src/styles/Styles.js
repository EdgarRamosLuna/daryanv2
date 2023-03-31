import styled from "styled-components";

export const Home = styled.div``;

export const Table = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    /*max-width: 800px;*/
    margin: 0 auto;
    font-size: 14px;
    line-height: 1.4;
  }
  .tab-container {
    width: 100%;
    display: flex;
  }
  .tab-items {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    border: 1px solid #570000;
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
  }
  .tab-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #570000;
    box-sizing: border-box;
    padding: 10px 20px;
    border-bottom: 0;
    border-left: 0;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transition: all 0.3s;
      background: #570000;
      color: #fff;
    }
  }
  .active {
    transition: all 0.3s;
    background: #570000;
    color: #fff;
  }
  thead {
    background-color: #570000;
    color: #fff;
    position: sticky;
    top: 0px;
    z-index: 10;
  }
  .no-sticky {
    position: unset;
    background: transparent;
    color: transparent;
    cursor: unset;
  }
  tr.hidden {
    border-color: transparent;
    background: transparent !important;
    cursor: default !important;
  }
  tr.hidden input {
    height: 0;
    margin-bottom: 0;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 0;
    border-color: transparent;
    cursor: default;
  }
  th {
    font-weight: bold;
    text-align: center;
    padding: 10px;
  }
  tbody > tr {
    cursor: pointer;
    &:hover {
      background-color: #e0e0e0;
    }
  }

  .table-center {
    text-align: center;
  }
  tbody tr:nth-child(even) {
    /*background-color: #f9f9f9;*/
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }
  .table-body {
    max-height: 666px;
    overflow-y: auto;
  }
  .boton-paginacion {
    background-color: #e0e0e0;
    border: none;
    color: #444;
    padding: 10px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    height: 35px;
  }

  .boton-paginacion.activo {
    background-color: #570000;
    color: white;
  }
  .table-container {
    width: 100%;
  }
  .contenedor-paginacion {
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .paginacion-number {
    height: 35px;
    display: flex;
  }
  .paginacion-number select {
    height: 100%;
    text-align: center;
  }
  .actions {
    font-size: 1.5em;
    display: flex;
    gap: 10px;
  }
  .actions i {
    cursor: pointer;
  }
  .fa-trash {
    color: red;
  }
  .fa-pen-to-square {
    color: green;
  }
  .fa-file-pdf {
    color: #570000;
  }

  .header-container {
    width: 100%;
    display: flex;
    margin: 10px 0;
    min-height: 57px;
    align-items: center;
  }
  .filter-container {
    display: flex;
    gap: 10px;
  }
  .filter-item {
    display: flex;
    gap: 5px;
    color: #570000;
  }
  .filter-item-input {
    display: flex;
    gap: 10px;
    position: relative;
    z-index: 15;
  }
  .filter-item-input input {
    outline: none;
    border: 1px solid #570000;
    box-sizing: border-box;
    padding: 5px;
    height: 20px;
    margin: 0;
  }
  .range {
    width: auto;
    min-width: 207.25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .react-datepicker-wrapper {
    text-align: center;
  }
  .custom-input {
    cursor: pointer;

    /*
  border-radius: 10px;
  border: 1px solid #570000;
  color: #fff;
  background: #570000;
  box-sizing: border-box;*/
  }
  .custom-input p {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 5px;
  }
  .input-date::before {
    content: "─";
    position: absolute;
    width: 100%;
    justify-content: center;
    display: flex;
  }
  .pagination {
    display: flex;
    border: 1px solid #dddddd;
    border-top: 0;
    border-left: 0;
    border-right: 0;

    height: 50px;
    align-items: center;
    justify-content: start;
  }
  .pagination select {
    max-width: 200px;
    margin: 0;
    padding: 5px;
  }
  .pagination button {
    height: 25px;
    width: 25px;
    color: #570000;
    border: 0;
    outline: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pagination select {
    margin-left: 10px;
    border: 1px solid #570000;
    color: #570000;
  }
  .pagination span {
    margin-left: 5px;
  }

  .table-reports tbody {
    min-height: 700px;
    position: relative;
    height: 700px;
    width: 100%;
  }
  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .table-data tr {
    input {
      padding-left: 0;
      padding-right: 0;
      text-align: center;
      min-width: 100px;
    }
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;
export const CreateForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  h2 {
    margin-bottom: 20px;
    text-align: center;
    font-weight: 400;
    color: #424242;
  }
  label {
    font-weight: 600;
    color: #424242;
    margin: 10px 0;
  }
  input {
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    margin-bottom: 20px;
    outline: none;
    background: transparent;
  }
  button {
    padding: 10px;
    background-color: rgb(79, 0, 3);
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    max-width: 100%;
  }
  p {
    text-align: center;
    margin-top: 20px;
    color: #424242;
  }
  a {
    font-weight: 600;
    color: #1976d2;
  }
  .item-from-container {
    width: 100%;
  }
`;

export const StyledModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 69;
  background: #00000082;
  display: flex;
  align-items: center;
  justify-content: center;
  .delete-confirm {
    display: flex;
    flex-direction: column;
  }
  .delete-confirm-label {
    font-size: 1.5em;
    text-align: center;
  }
  .btn {
    min-width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 0;
    color: #fff;
    cursor: pointer;
  }
  .btn-success {
    background-color: green;
  }
  .btn-danger {
    background-color: #4f0104;
  }
  .delete-confirm-btns {
    width: 100%;
    display: flex;
    gap: 10px;
    margin: 10px 0;
    justify-content: center;
  }
  .modal-container {
    width: auto;
    margin: 0 auto;
    height: auto;
    background: #fff;
    padding: 15px 25px;
    max-width: 600px;
    min-width: 350px;
  }
  .modal-close {
    width: 100%;
    display: flex;
    justify-content: end;
    button {
      background: none;
      border: 0;
      cursor: pointer;
    }
    i {
      color: #4f0104;
      font-size: 1.5em;
    }
  }
`;

export const SettingsStyle = styled.div`
  display: flex;
  flex-direction: column;
  // background: #f3f3f3;
  background: transparent;
  width: 60%;
  box-sizing: border-box;
  padding: 15px 25px;
  position: relative;
  margin: 0 auto;
`;

export const StyledStatusBtn = styled.button`
  box-sizing: border-box;
  padding: 5px 25px;
  border-radius: 5px;
  border: 0;
  background: ${(props) => (props.statusBtn === 1 ? "green" : "red")};
  color: #fff;
  cursor: pointer;
`;

export const InputDate = styled.input`
  padding-left: 0;
  padding-right: 0;
  text-align: center;
  min-width: 80px;
`;
