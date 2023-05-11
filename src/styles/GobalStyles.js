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

  /* Firefox */
  .list-container ul, .item-list ul{
    scrollbar-color: #fff #fff;
    scrollbar-width: none;

    -ms-overflow-style: none; 
    
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
    color: #570000;
 //   background: linear-gradient(#570000, #570000);
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
    overflow-y: scroll;
    bottom: -43px;
    position: absolute;
    z-index: 99999;
    height: 115px !important;
    -webkit-box-pack: start !important;
    justify-content: start !important;
    top: 0;
  }
}
.auth-clientes {
    margin: 0 auto;
}
`;

export default GlobalStyle;
