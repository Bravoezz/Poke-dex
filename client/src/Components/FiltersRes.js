import React from "react";
import fil from "../ajuste.png";

const FiltersRes = ({setStateFilter}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        userSelect: "none",
        borderBottom: "solid 2px rgba(220,220,220,0.3)",
        padding: '0px',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginLeft: "20px",
        }}
      >
        <span>
          <img
          onClick={()=> setStateFilter(true)}
            src={fil}
            alt="img"
            style={{
              width: "40px",
              cursor:'pointer'
            }}
          />
        </span>
        <span
        onClick={()=> setStateFilter(true)}
        style={{cursor:'pointer',margin:'0px !important', fontSize: '24px',fontWeight:'bolder',}}
        >Filter</span>
      </div>
    </div>
  );
};

export default FiltersRes;
