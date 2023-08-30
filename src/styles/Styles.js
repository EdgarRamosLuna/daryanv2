import styled from "styled-components";

export const Home = styled.div``;

export const Table = styled.div`

  .btn-pdf {
      display: flex;
      align-items: center;
  }
  .span-btn-hover {
    transition: all 0.6s;
    color: #fff !important;
    background-color: green !important;
    border-color: green !important;
  }
  .span-btn1 {
    color: red;
    cursor: pointer;
    border-bottom: 1px solid;
  }
  .span-btn3 {
    color: orange;
    cursor: pointer;
    border-bottom: 1px solid;
  }
  .span-btn4 {
    color: gray;
    cursor: pointer;
    border-bottom: 1px solid;
  }
  .span-btn-clause {
    pointer-events: none;
    color: green;
    cursor: pointer;
    border: 2px solid;
    border-radius: 100%;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 15px;
    margin: 0 auto;
    transition: all 0.6s;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    /*max-width: 800px;*/
    margin: 0 auto;
    font-size: 14px;
    line-height: 1.4;
  }
  .charts {
    display: flex;
    justify-content: start;
    width: 50%;
    //height: 263px;
  }
  .table-controlls-left {
    width: 628px;
  }
   
  .smoothFadeIn {
    position: relative;
    animation: smoothFadeIn 0.3s;
    transition: all 0.3s;
  }
  .smoothFadeOut {
    position: relative;
    animation: smoothFadeOut 0.3s;
    animation-delay: 0.3s;
    transition: all 0.3s;
  }

  .tab-container {
    width: 100%;
    display: flex;
  }
  .tab-items {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    border: 1px solid #002353;
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
  }
  .tab-item {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #002353;
    box-sizing: border-box;
    padding: 10px 20px;
    border-bottom: 0;
    border-left: 0;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;
    &:hover {
      transition: all 0.3s;
      background: #002353;
      color: #fff;
    }
  }
  .active {
    transition: all 0.3s;
    background: #002353;
    color: #fff;
  }
  thead {
    background-color: #002353;
    color: #fff;
    position: sticky;
    top: 0px;
    z-index: 998;
  }
  .react-datepicker {
  }
  .react-datepicker-popper {
    z-index: 999;
  }
  .no-sticky {
    position: unset;
    background: transparent;
    color: transparent;
    cursor: unset;
    * {
      color: transparent !important;
    }
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
    position: relative;
    //z-index: 8;
    &:hover {
      background-color: rgb(0 65 155 / 28%) !important;
    }
  }

  .table-center {
    text-align: center;
    span {
      font-weight: bold;
    }
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
    background-color: #002353;
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
    color: #002353;
  }

  .header-container {
    width: 100%;
    display: flex;
    margin: 10px 0;
    min-height: 88px;
    align-items: center;
    gap: 30px;
  }
  .header-container2 {
    width: 100%;
    display: flex;
    margin: 10px 0;
    min-height: 88px;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap-reverse;
    justify-content: center;
    margin-bottom: 0;
  }
  .select-container {
    align-self: center;
  }
  .filter-container {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .filter-item {
    display: flex;
    gap: 5px;
    color: #002353;
    flex-direction: column;
  }
  li {
    list-style: none;
  }
  .filter-items {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-items: center;
  }
  .filter-items2 {
    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-items: start;
    justify-content: space-between;
  }

  .filter-item-in {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;
    input {
      margin-top: 5px;
      margin-bottom: 0;
    }
  }
  .item-list {
    width: 100%;
    display: flex;

    //overflow-y: hidden;
    min-height: 30px;
    min-width: 150px;
    color: #447b91;
    position: relative;

    ul {
      opacity: 0.5; /* Empieza con una opacidad de 0.5 */

      animation: fadein 0.1s ease-in-out forwards;
      border: 1px solid /*rgb(122, 89, 89)*/;
      border-radius: 5px;
      height: auto;
      text-align: center;
      display: flex;
      cursor: pointer;
      background-color: rgb(255, 255, 255);
      max-width: 600px;
      flex-direction: column;
      transition: height 1s ease 0s;
      justify-content: start;
      align-items: end;
      min-width: 150px;
      overflow-y: scroll;
      bottom: -43px;
      position: absolute;
      //z-index: 99999;
      top: 0px;
      height: 115px !important;
      li {
        width: auto;
        text-align: left;
        padding: 3px 15px;
        opacity: 0.5;
        animation: 0.1s ease-in-out 0s 1 normal forwards running fadeinBottom;
        display: flex;
        gap: 10px;
        margin: 0px 5px;
        box-sizing: border-box;
        cursor: default;
        i {
          color: rgb(122, 89, 89);
        }
      }
    }
  }
  .loaderContainer {
    opacity: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    animation: hideLoader 0.1s ease-in-out forwards;
    transition: all 0.3s;
  }
  .rloaderContainer {
    animation: rhideLoader 0.2s ease-in-out forwards;

    opacity: 0;
    transition: all 0.3s;

    tr,
    td {
      border-color: transparent;
    }
  }
  .tr-hd {
    animation: hideLoader 0.2s ease-in-out forwards;

    opacity: 0;
    transition: all 0.3s;

    tr,
    td {
      border-color: transparent;
    }
  }
  @keyframes rhideLoader {
    from {
      opacity: 0;
      border-color: transparent;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hideLoader {
    to {
      opacity: 0;
      tr,
      td * {
        border-color: inherit;
      }
    }
  }
  @keyframes smoothFadeIn {
    from {
      opacity: 0;
      //visibility: hidden;
      bottom: -15px;
    }
    to {
      opacity: 1;
      //visibility: visible;
      bottom: 0;
    }
  }
  @keyframes smoothFadeOut {
    from {
      opacity: 1;
      //visibility: visible;
      bottom: 0;
    }
    to {
      opacity: 0;
      //visibility: hidden;
      bottom: -15px;
    }
  }
  @keyframes fadeinBottom {
    from {
      opacity: 0.5; /* Empieza con una opacidad de 0.5 */
      transform: translateY(50px); /* Empieza desde 50px abajo */
    }
    to {
      opacity: 1; /* Termina con una opacidad de 1 */
      transform: translateY(0); /* Termina en su posición original */
    }
  }
  @keyframes fadein {
    /* from {
      opacity: 0.5; /* Empieza con una opacidad de 0.5 
      transform: translateX(50px); /* Empieza desde 50px abajo 
    }*/
    to {
      opacity: 1; /* Termina con una opacidad de 1 */
      transform: translateX(0); /* Termina en su posición original */
    }
  }
  .filter-item-input {
    display: flex;
    gap: 10px;
    position: relative;
    z-index: 15;
    width: 280px;
    justify-content: space-between;
    input {
      outline: none;
      border: 1px solid #002353;
      box-sizing: border-box;
      padding: 9px;
      height: 45px;
      margin: 0px;
      width: 100%;
    }
  }
  .input-date {
    width: 100%;
  }
  .label-center {
    margin: 0 auto;
  }
  .range {
    width: auto;
    min-width: 207.25px;
    display: flex;
    justify-content: center;
  }
  .react-datepicker-wrapper {
    text-align: center;
  }
  .custom-input {
    cursor: pointer;

    /*
  border-radius: 10px;
  border: 1px solid #002353;
  color: #fff;
  background: #002353;
  box-sizing: border-box;*/
  }
  .custom-input p {
    display: flex;
    width: 100%;
    -webkit-box-pack: center;
    justify-content: center;
    gap: 5px;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5px;
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
    color: #002353;
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
    border: 1px solid #002353;
    color: #002353;
  }
  .pagination span {
    margin-left: 5px;
    color: #002353;
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
    //width: 100%;
    gap: 20px;
    width: 100%;
  }
  .filter-options {
    height: 145px;
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
  .checkbox-contain {
    display: flex;
    justify-content: start;
    gap: 10px;
  }
  .checkbox-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    input {
      margin-top: 4px !important;
      height: 20px;
      width: 20px;
    }
    label {
      margin: 0;
      padding: 0;
    }
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
    background: linear-gradient(-90deg, #002353 10%, #00060e 100%);
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    max-width: 100%;
    height: 37px;
    img {
      height: 100%;
    }
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
    display: flex;
    flex-direction: column;
    gap: 5px;
    input {
      margin: 0;
    }
    .error {
      //      color: red;
      color: #4f0003;
    }
  }
`;

export const StyledModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
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
    margin: 15px 0;
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
    justify-content: end;
  }
  .modal-container {
    width: 100%;
    margin: 0 auto;
    height: auto;
    background: #fff;
    padding: 15px 25px;
    max-width: ${(props) => (props.width ? props.width : "900")}px;
    min-width: 350px;
  }
  .modal-details-header {
    margin: 15px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    h2 {
      color: rgb(0, 35, 83);
      text-transform: uppercase;
    }
    h3 {
      color: #9e9e9e;
    }
  }
  .modal-details {
    margin: 0 25px;
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
  width: 90%;
  box-sizing: border-box;
  padding: 15px 0;
  position: relative;
  margin: 0 auto;
  .my-acc-title {
    text-align: center;
    margin-bottom: 15px;
  }
`;

export const StyledStatusBtn = styled.button`
  box-sizing: border-box;
  padding: 5px 25px;
  border-radius: 5px;
  border: 0;
  background: ${(props) => (props.statusBtn === 1 ? "green" : "red")};
  color: #fff;
  cursor: pointer;
  width: 110px;
  outline: none;
`;

export const InputDate = styled.input`
  padding-left: 0;
  padding-right: 0;
  text-align: center;
  min-width: 80px;
`;
export const AuthUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
