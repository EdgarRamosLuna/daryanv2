import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Lato-R';
    src: url('/assets/fonts/Lato/Regular.ttf');
  }
  @font-face {
    font-family: 'Lato-B';
    src: url('/assets/fonts/Lato/Bold.ttf');
  }
  @font-face {
    font-family: 'Lato-I';
    src: url('/assets/fonts/Lato/Italic.ttf');
  }
  @font-face {
    font-family: 'OpenS-R';
    src: url('/assets/fonts/Open_Sans/Regular.ttf');
  }
  @font-face {
    font-family: 'OpenS-B';
    src: url('/assets/fonts/Open_Sans/Bold.ttf');
  }
  @font-face {
    font-family: 'OpenS-I';
    src: url('/assets/fonts/Open_Sans/Italic.ttf');
  }
  @font-face {
    font-family: 'Roboto-R';
    src: url('/assets/fonts/Roboto/Regular.ttf');
  }
  @font-face {
    font-family: 'Roboto-B';
    src: url('/assets/fonts/Roboto/Bold.ttf');
  }
  @font-face {
    font-family: 'Roboto-I';
    src: url('/assets/fonts/Roboto/Italic.ttf');
  }
  html{
    scroll-behavior: smooth;
    scrollbar-width: none;
  }
    /* Webkit */
 
  ::-webkit-scrollbar, .item-list ul::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
    height: 10px;
      
  }
  
 ::-webkit-scrollbar-thumb, .item-list ul::-webkit-scrollbar-thumb {
    border-radius: 0;
   // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  //  background-color: rgb(255 255 255);
    background-color: rgb(68 123 145);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    padding: 0 4px;
    border-radius: 7px;
  }
  .list-container ul::-webkit-scrollbar, .item-list ul::-webkit-scrollbar {
    width: 3px;
    background-color: transparent;
    height: 10px;
      
  }
  
 .list-container ul::-webkit-scrollbar-thumb, .item-list ul::-webkit-scrollbar-thumb {
    border-radius: 0;
   // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  //  background-color: rgb(255 255 255);
    background-color: rgb(68 123 145);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    padding: 0 4px;
    border-radius: 7px;
  }
  .MuiInputBase-input{
    
  }
  /* Firefox */
  .list-container ul, .item-list ul{
    scrollbar-color: #fff #fff;
    scrollbar-width: none;

    -ms-overflow-style: none; 
    
  }

  .filter-container .filter-item:first-child div:first-child {
    color: #002353;
  }
  .date-picker-hint {
    color: transparent !important;
}
  /* scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #ff0000;
  } */
  /* scrollbar {
    width: 12px;
    background-color: #F5F5F5;
  } */
  body{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  table{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    thead{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  }
  a{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .active{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  h1, h2, h3, h4, h5{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  button{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-transform: uppercase;
    cursor: pointer;

  }
  p{
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .container-checkbox {
    display: flex;
    flex-direction: column;
    min-height: 214px;
    justify-content: space-between;
}
.c2, .c4{
    input,
    select,
    textarea {
      width: 100%;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      border: 1px solid #447b91;
      border-radius: 4px;
      resize: vertical;
      background: transparent;
      outline: none;
      
    } 
  }
  .c2, .c4{
    select, input{
      max-height: 43px;
    }
  }
.App{
  tr input{
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
    box-sizing: border-box;
    min-width: 80px;
  }
}
.btns-header {
  width: 100%;
  display: flex;
  gap: 10px;
  margin: 0 25px;
  /* button {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
  } */
}
.btns-header center {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: bold;
}
.btns-header button{
  width: auto;
  border: 2px solid;
  box-sizing: border-box;
  border-radius: 15px;
  font-size: 0.8em;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  &:hover{
    transition: all 0.3s ease-in-out;
    background-color: #fff;
    color: #002353;
 //   background: linear-gradient(#002353, #002353);
  }
}
.clients-container{
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 30px;
  position: relative;
  height: auto;
  select{
    margin: 0;
  }
} 
.list-container {
  ul{
    justify-content: start !important;
  }
}
.auth-clientes {
   // margin: 0 auto;
}
.chart-btn{
  min-width: 80px !important;
  display: flex;
  gap: 10px;
  font-size: 1em !important;
}
.btn-charts{
 // margin:0 auto !important;

}
.container-app{
  position: relative;

  &:before{
    content: '';
    background: url('/assets/img/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;  
    background-color: #fff;
    height: 100vh;
    width: 100vw;
    position: absolute;
    opacity: 0.1;
    z-index: -1;
  }
  
}
.table-controlls {
    position: relative;
}
.table-controlls-left-item {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(0, 35, 83);
    border-width: 1px 1px 0px;
    border: 1px solid rgb(0, 35, 83);
    border-bottom: 0;
    width: 30px;
    &:hover {
      color: #fff;
      background-color: rgb(0, 65, 155);
      transition: all 0.3s ease-in-out;
      cursor: pointer;
    }
  }
  .activeFilters {
    color: #fff;
    background-color: rgb(0, 65, 155);
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }

  .btn-table-cont{
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }
  
`;

export default GlobalStyle;
