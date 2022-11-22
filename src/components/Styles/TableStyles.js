import styled from "@emotion/styled";
import { lightThemeColor } from "../../constants/constant";

export const BasicTableContainer = styled.div`
  width: 100%;
  margin: auto;
  border: 1px solid black;
  padding: 20px;
`;

export const table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;s
  margin: auto;
  color: white;
`;
export const thead = styled.thead`
  border: 1px solid ${lightThemeColor};
`;
export const tfoot = styled.tfoot``;
export const th = styled.th`
  text-align: center;
  width: fit-content;
  padding: 15px;
  font-size: 14px;
  letter-spacing: 0.5px;
  background-color: ${lightThemeColor};
  color: #ffffff;
`;
export const span = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 5px;
`;

// export const tfd = styled.td`
//     border: 1px solid #ddd;
//     padding: 8px;
//     padding-top: 12px;
//     padding-bottom: 12px;
//     text-align: left;
//     background-color: #4CAF50;
//     color: white;
// `

export const tr = styled.tr`
  :nth-of-type(even) {
    background-color: #f8f8f8;
    color: black;
  }
  :nth-of-type(odd) {
    background-color: white;
    color: black;
  }
  width: fit-content;
`;

export const trM = styled.tr`
  :nth-of-type(even) {
    background-color: ${(props) => (props.row > 0 ? "#f6c4c4" : "#FFFFFF")};
    color: ${(props) => (props.row > 0 ? "black" : "black")};
  }
  :nth-of-type(odd) {
    background-color: ${(props) => (props.row > 0 ? "#f6c4c4" : "#FFFFFF")};
    color: ${(props) => (props.row > 0 ? "black" : "black")};
  }
  width: fit-content;
`;

export const tbody = styled.tbody``;
export const td = styled.td`
  border: 1px solid ${lightThemeColor};
  padding-left: 15px;
  width: fit-content;
  font-size: 13px;
  text-align: left;
`;

export const navButton = styled.button`
  padding: 5px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 2px;
`;

export const buttonCon = styled.div`
  display: flex;
  width: fit-content;
  gap: 10px;
  margin-left: 50%;
  align-items: center;
  margin: auto;
`;

export const showSize = styled.p`
  font-size: 14px;
  display: flex;
`;

export const edit = styled.button`
  width: 40%;
  height: auto;
  cursor: pointer;
`;
export const del = styled.button`
  width: 40%;
  height: auto;
  cursor: pointer;
`;

export const actionCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;
