import styled from "styled-components";

export const StyledPdfReport = styled.div`
  .two-columns {
    grid-column: span 2;
  }

  .six-columns {
    grid-column: span 6;
  }

  .nine-columns {
    grid-column: span 9;
  }

  .eleven-columns {
    grid-column: span 11;
  }

  .vertical-text {
    writing-mode: vertical-rl;
    grid-row: span 5;
  }

  .seven-columns {
    grid-column: span 7;
  }

  .container {
    margin: 0px;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid;
    
  }
  .row-item {
    border-left: 2px solid;
    box-sizing: border-box;
    border-right: 0;
    border: 0;
    border-right: 2px solid;
    border-top: 1 px solid;
    border-bottom: 0;
    border: 0;
  }

  .reportGrid {
    display: grid;
    grid-template-columns: 141px 2fr 2fr 2fr 150px 260px 1fr 100px;
    border: 1px solid;
    box-sizing: border-box;
    align-content: center;
    grid-template-rows: 40px;
    border-left: 2px solid;
  }
`;
