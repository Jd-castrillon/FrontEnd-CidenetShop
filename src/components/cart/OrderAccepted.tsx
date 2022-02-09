import React from "react";
import Alert from "../alert/Alert";

import Box from "@material-ui/core/Box";
import NavigateBar from "../header/NavigateBar";

const OrderAccepted = () => {
  return (
    <div style={{ margin: "2rem" }}>
      <NavigateBar />
      <Box minHeight="77vh" style={{ padding: "2rem" }}>
        <Alert text={`✔️ Tu orden se ha guardado con éxito. \n
        Te enviaremos los detalles a tu correo.`} />
        <div></div>
      </Box>
    </div>
  );
};

export default OrderAccepted;
