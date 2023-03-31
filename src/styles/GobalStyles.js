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
  }
  body{
    font-family: 'Roboto-R';
  }
  table{
    font-family: 'Lato-R';
    thead{
        font-family: 'OpenS-B';
    }
  }
  a{
    font-family: 'Lato-B';
  }
  .active{
    font-family: 'Roboto-B';
  }
  h1, h2, h3, h4, h5{
    font-family: 'OpenS-B';
  }
  button{
    font-family: 'OpenS-B';
    text-transform: uppercase;
    cursor: pointer;

  }
  p{
    font-family: 'Lato-R';
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
`;

export default GlobalStyle;
