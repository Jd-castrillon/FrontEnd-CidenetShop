import React from "react";
import Alert from "../alert/Alert";

import Box from "@material-ui/core/Box";
import NavigateBar from "../header/NavigateBar";

const NoProductMessage = () => {
  return (
    <div>
      <NavigateBar />
      <Box minHeight="77vh">
        <Alert text="🙁 Ups, no has seleccionado ningun producto!" />
        <div></div>
      </Box>
    </div>
  );
};

export default NoProductMessage;
