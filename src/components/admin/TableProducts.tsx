import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell } from "@material-ui/core";
import { TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { getProducts } from "../../service/GetProducts";
import { ItemProduct } from "../../types/ItemProduct";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "80%",
    margin: "auto",
    marginTop: "20px",
    minHeight: "77vh",
  },
});

const TableProducts = () => {
  const [itemProduct, setItemProduct] = useState([] as ItemProduct[]);

  useEffect(() => {
    let url: string = `http://localhost:7070/jdshop/products/`;

    const getListProducts = async () => {
      const products = getProducts(url);

      products.then((res) => setItemProduct(res));

      //setItemProduct(await products);
    };
    getListProducts();
  }, [itemProduct.length]);

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} style={{ zIndex: 1 }}>
        <TableContainer>
          <Table className="" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 50 }}>Producto</TableCell>
                <TableCell align="right" style={{ minWidth: 80 }}>
                  Genero
                </TableCell>
                <TableCell align="right" style={{ width: 190 }}>
                  Descripcion
                </TableCell>
                <TableCell align="right" style={{ minWidth: 130 }}>
                  Precio
                </TableCell>
                <TableCell align="right" style={{ minWidth: 130 }}>
                  Marca
                </TableCell>
                <TableCell align="right" style={{ minWidth: 120 }}>
                  {" "}
                  Eliminar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemProduct.map((item, index) => {
                let urlImage: string = `data:image/JPG;base64,${item.picture}`;
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
                    <TableCell align="right">{item.gender}</TableCell>
                    <TableCell align="right">{item.description}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.brand}</TableCell>
                    <TableCell align="right">
                      <button>
                        <DeleteOutlineOutlinedIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default TableProducts;
