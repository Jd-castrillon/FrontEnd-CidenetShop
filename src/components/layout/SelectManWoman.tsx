import React from "react";
import '../../styles/select.css';
const selectManWoman = () => {
  return (
    <div>
      <select className="select button" name="selectManWoman" id="selectManWoman" >
        <option value="masculino" >Hombre</option>
        <option value="femenino">Mujer</option>
      </select>
    </div>
  );
};

export default selectManWoman;
