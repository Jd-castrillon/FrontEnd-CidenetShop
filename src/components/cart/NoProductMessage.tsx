import React from "react";
import Alert from "../alert/Alert";

import Box from "@material-ui/core/Box";

const NoProductMessage = () => {
  return (
    <Box minHeight="77vh">
      <Alert text="🙁 Ups, no has seleccionado ningun producto!" />
      <div></div>
    </Box>
  );
};

export default NoProductMessage;
