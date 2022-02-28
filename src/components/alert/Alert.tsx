import React from "react";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  text: string;
}

const Alert = ({ text }: Props) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="80px"
        margin="80px 0"
        style={{ whiteSpace: "pre-line" }}
      >
        <div>
          <h2 style={{ marginBottom: "20px" }}>{text}</h2>
        </div>
        <div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#4A8BFD",
                fontFamily: "'Rubik', sans-serif",
                fontWeight: "bolder",
                letterSpacing: "0.1rem",
                color:"black"
              }}
            >
              Ver productos
            </Button>
          </Link>
        </div>
      </Box>
    </>
  );
};

export default Alert;
