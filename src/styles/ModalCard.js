import styled from "styled-components";

export const ModalCard = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;  
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
  transition: all 0.3s ease 0s;
  justify-content: center;
  align-items: self-start;
  box-sizing: border-box;
  padding: 10px 25px;
  position: absolute;
  top: 100%;
  z-index: 9;
  left: 33px;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }
  .filter-option-item {
    display: grid;
    gap: 10px;
    grid-template-columns: 10% 90%;
    justify-content: space-between;
    align-items: center;
    
    label {
        width: 100%;
        display: block;
        text-align: left;
        user-select: none;
        cursor: pointer;
    }
    input{
        cursor: pointer;
    }
}

/*
 display: flex;
  flex-direction: column;
  min-width: 200px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;
  transition: all 0.3s ease 0s;
  justify-content: center;
  align-items: self-start;
  box-sizing: border-box;
  padding: 0 25px;
  position: absolute;
  /* top: 100%;
  left: 31px; 
  bottom: 0;
  left: 33px;
  //bottom: 100%;
  z-index: 99;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }
  .filter-option-item {
    display: grid;
    gap: 10px;
    grid-template-columns: 10% 90%;
    justify-content: space-between;
    align-items: center;
    label {
      width: 100%;
      cursor: pointer;
      display: block;
      text-align: left;
      user-select: none;
    }
    input{
        cursor: pointer;
    }
  }
  .filter-option-container {
    display: flex;
    gap: 12px;
  }
*/
  /* .filter-option-container {
    background: red;
    max-width: 260px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: self-start;
    box-sizing: border-box;
    padding: 10px 25px;
    position: absolute;
    top: 100%;
    z-index: 9;
} */
`;
