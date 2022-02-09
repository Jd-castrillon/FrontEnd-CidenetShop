import React from "react";
import Alert from "../alert/Alert";

import Box from "@material-ui/core/Box";
import NavigateBar from "../header/NavigateBar";

const OrderRefusedMessage = () => {
  return (
    <div style={{ margin: "2rem" }}>
      <NavigateBar />
      <Box minHeight="77vh" style={{ padding: "2rem" }}>
        <Alert text="❌ Nos hemos quedado sin stock" />
        <div></div>
      </Box>
    </div>
  );
};

export default OrderRefusedMessage;
