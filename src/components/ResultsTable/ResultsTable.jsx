import { useState } from "react";
import "./ResultTables.scss";

const ResultsTable = (props) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const id = props.id;

  const handleRowClick = (index) => {
    setSelectedRowIndex(index === selectedRowIndex ? null : index);
  };

  return (
    <>
      <tr
        key={props.key}
        onClick={() => handleRowClick(props.key)}
        className={props.key === selectedRowIndex ? "selected-row" : ""}
      >
        <td>{id}</td>
        <td>{props.title}</td>
        <td>{props.firstName}</td>
        <td>{props.surName}</td>
        <td>{props.email}</td>
        <td>{props.roomId}</td>
        <td>{props.checkInDate}</td>
        <td>{props.checkOutDate}</td>
        <td>{props.nights}</td>
        <td>
          <button
            onClick={(e) => {
              e.preventDefault();
              
            }}
          >
            Show Profile
          </button>
        </td>
      </tr>
    </>
  );
};

export default ResultsTable;
