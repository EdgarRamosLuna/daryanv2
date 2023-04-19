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
`;

export default GlobalStyle;
