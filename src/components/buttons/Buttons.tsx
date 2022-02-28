import React from "react";

import { Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  setShowForm: (open: boolean) => void;
}

const Buttons: React.FC<Props> = ({ setShowForm }) => {
  return (
    <>
      <Box display="flex" justifyContent=" flex-end" p={1}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#000", color: "#fff",  fontFamily:"'Rubik', sans-serif",fontWeight:"lighter", letterSpacing:"0.1rem"  }}
          onClick={() => setShowForm(true)}
        >
          Finalizar compra
        </Button>
      </Box>
      <Box display="flex" justifyContent=" flex-end" p={1} mb={10}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" style={{ backgroundColor: "#4A8BFD",  fontFamily:"'Rubik', sans-serif",fontWeight:"lighter", letterSpacing:"0.1rem"  }}>
            Continuar comprando
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default Buttons;
