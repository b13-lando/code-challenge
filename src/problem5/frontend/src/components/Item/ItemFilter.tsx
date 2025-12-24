import React from "react";

interface Props {
  showActive: boolean | undefined;
  onChange: (value: boolean | undefined) => void;
}

export const ItemFilter: React.FC<Props> = ({ showActive, onChange }) => (
  <div style={{ marginBottom: "10px" }}>
    <strong>Filter: </strong>
    <button onClick={() => onChange(undefined)}>All</button>
    <button onClick={() => onChange(true)} style={{ marginLeft: "5px" }}>
      Active
    </button>
    <button onClick={() => onChange(false)} style={{ marginLeft: "5px" }}>
      Inactive
    </button>
  </div>
);
