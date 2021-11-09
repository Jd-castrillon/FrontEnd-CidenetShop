import React from "react";
import "../../styles/_globals.scss";
const InputSearch = () => {
  return (
    <div className="searchBox__inputSearch flex flex-jc-sb ">
      <form action="POST">
        <input type="text" placeholder="Buscar producto" />
      </form>

      <a href="#" type="button" className="button">
        x
      </a>
    </div>
  );
};

export default InputSearch;
