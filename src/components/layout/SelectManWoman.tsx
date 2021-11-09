import React from "react";

const selectManWoman = () => {
  return (
    <div>
      <select className="header__select button" name="selectManWoman" id="selectManWoman" >
        <option value="masculino" >Hombre</option>
        <option value="femenino">Mujer</option>
      </select>
    </div>
  );
};

export default selectManWoman;
