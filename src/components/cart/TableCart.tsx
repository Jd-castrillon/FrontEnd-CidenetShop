import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CartContext } from "../../context/CartProvider";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Table, TableBody, TableCell } from "@material-ui/core";
import { TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Paper, Box } from "@material-ui/core";
import { ItemProduct } from "../../types/ItemProduct";


import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Buttons from "../buttons/Buttons";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
    marginTop: "20px",
    minHeight: "77vh",
  },
});

interface Props {
  setShowForm: (open: boolean) => void;
}

const TableCart: React.FC<Props> = ({ setShowForm }) => {
  const { getCart, totalCost, deleteProduct } = React.useContext(CartContext);
  const navigate = useNavigate();
  const [listCart, setlistCart] = useState([] as ItemProduct[]);
  const [isUpdate, setIsUpdate] = useState<number>(0);

  const cart = localStorage.getItem('Car')

  useEffect(() => {
    setlistCart(getCart());
  }, [cart,getCart,deleteProduct,isUpdate]);

  const classes = useStyles();

  return (
    <div>
     
        <Paper className={classes.root} style={{ zIndex: 1 }}>
        <TableContainer>
          <Table className="" stickyHeader aria-label="sticky table">
            <TableHead style={{ zIndex: 0 }}>
              <TableRow>
                <TableCell style={{ minWidth: 50 }}>Producto</TableCell>
                <TableCell align="right" style={{ minWidth: 80 }}>
                  Talla
                </TableCell>
                <TableCell align="right" style={{ minWidth: 100 }}>
                  Cantidad
                </TableCell>
                <TableCell align="right" style={{ minWidth: 130 }}>
                  Precio
                </TableCell>
                <TableCell align="right" style={{ minWidth: 120 }}>
                  {" "}
                  Eliminar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listCart.map((item, index) => {
                let urlImage: string = `data:image/JPG;base64,${item.picture}`;
                const handleDelete = () => {
                  deleteProduct(item);
                  navigate("/cart")
                  setIsUpdate(isUpdate + 1);
                  
                };
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Link to={`/item/${item.id}`}>
                        <img
                          src={urlImage}
                          alt="img"
                          style={{ width: "82px", borderRadius: "5%" }}
                        />
                      </Link>
                    </TableCell>
                    <TableCell align="right">{item.size}</TableCell>
                    <TableCell align="right">{item.amount}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">
                      <button onClick={handleDelete}>
                        <DeleteOutlineOutlinedIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box display="flex" justifyContent="flex-end" p={1}>
            Costo total : {totalCost()}
          </Box>
        </TableContainer>

        <Buttons setShowForm={setShowForm} />
      </Paper>
      
      
    </div>
  );
};

export default TableCart;
