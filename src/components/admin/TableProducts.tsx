import React, { useState, useEffect } from "react";
import { InputLabel } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell } from "@material-ui/core";
import { TableContainer, TableHead, TableRow } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { getProducts } from "../../service/GetProducts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Box from "@mui/material/Box";
import { AuthContext } from "../../context/AuthProvider";
import DeleteProductsForm from "../forms/DeleteProductForm";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddProduct from "./AddProduct";

import SearchIcon from "@mui/icons-material/Search";

import { ItemAdminProduct } from "../../types/ItemAdminProduct";
import UpdateProduct from "./UpdateProduct";

const useStyles = makeStyles({
  root: {},
});

const TableProducts = () => {
  const [itemProduct, setItemProduct] = useState([] as ItemAdminProduct[]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [itemsFilter, setItemsFilter] = useState([] as ItemAdminProduct[]);
  const [filterChange, setFilterChange] = useState("");
  const [genderChange, setGenderChange] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const hanleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const { getToken } = React.useContext(AuthContext);

  const [item, setItem] = useState<ItemAdminProduct>();
  const classes = useStyles();

  const handleSelectChange = (e: any) => {
    setGenderChange(e.target.value);
  };

  useEffect(() => {
    const ac = new AbortController();

    setItemsFilter([]);
    setFilterChange("");

    let url: string = `http://localhost:7070/jdshop/products/${genderChange}`;

    const getListProducts = async () => {
      const products = getProducts(url, getToken());

      setItemProduct(await products);
    };

    getListProducts();
    return () => ac.abort(); // Abort both fetches on unmount
  }, [showDeleteForm, genderChange, showUpdateForm, getToken]);

  const handleCloseDeleteForm = () => {
    setShowDeleteForm(false);
  };
  const handleOpenDeleteForm = (open: boolean, item: ItemAdminProduct) => {
    setShowDeleteForm(open);
    setItem(item);
  };
  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };
  const handleOpenUpdateForm = (open: boolean, item: ItemAdminProduct) => {
    setShowUpdateForm(open);
    setItem(item);
  };

  if (showUpdateForm && item !== undefined) {
    return (
      <UpdateProduct
        open={showUpdateForm}
        handleClose={handleCloseUpdateForm}
        item={item}
      />
    );
  }

  if (showDeleteForm && item !== undefined) {
    return (
      <DeleteProductsForm
        open={showDeleteForm}
        handleClose={handleCloseDeleteForm}
        item={item}
      />
    );
  }

  const filter = (textFilter: string) => {
    let items: ItemAdminProduct[] = itemProduct.filter(
      (item: ItemAdminProduct) => {
        if (
          item.name
            .toString()
            .toLowerCase()
            .includes(textFilter.toLowerCase()) ||
          item.color
            .toString()
            .toLowerCase()
            .includes(textFilter.toLowerCase()) ||
          item.brand
            .toString()
            .toLowerCase()
            .includes(textFilter.toLowerCase())
        ) {
          return item;
        }
        return null;
      }
    );

    setItemsFilter(items);
  };

  const handleFilterChange = (e: any) => {
    setFilterChange(e.target.value);
    filter(e.target.value);
  };

  if (showAddForm) {
    return <AddProduct open={showAddForm} handleClose={hanleCloseAddForm} />;
  }

  return (
    <div className="tableProducts-container">
      <div className="filters">
        <div className="filter">
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <SearchIcon />
            <TextField
              variant="standard"
              type="text"
              id="filter"
              name="filter"
              label="filtrar"
              value={filterChange}
              style={{ top: "3px" }}
              onChange={handleFilterChange}
            ></TextField>
          </Box>
        </div>
        <div className="filter" style={{}}>
          <InputLabel id="gender">Genero</InputLabel>

          <Select
            variant="standard"
            id="gender"
            name="gender"
            label="Genero"
            value={genderChange}
            style={{ width: "13rem" }}
            onChange={handleSelectChange}
          >
            <MenuItem value="">Ninguno</MenuItem>
            <MenuItem value="masculino">Masculino</MenuItem>
            <MenuItem value="femenino">Femenino</MenuItem>
          </Select>
        </div>
        <div className="btn-container filter">
          <button className="btn-add" onClick={() => setShowAddForm(true)}>
            <div className="">AGREGAR PRODUCTO</div>
          </button>
        </div>
      </div>

      <Paper className={classes.root} style={{ zIndex: 1 }}>
        <TableContainer>
          <Table className="" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 50 }}>Producto</TableCell>
                <TableCell align="right" style={{ minWidth: 80 }}>
                  Genero
                </TableCell>

                <TableCell align="right" style={{ minWidth: 130 }}>
                  Precio
                </TableCell>
                <TableCell align="right" style={{ minWidth: 130 }}>
                  Marca
                </TableCell>
                <TableCell align="right" style={{ minWidth: 130 }}>
                  Activo
                </TableCell>
                <TableCell align="right" style={{ minWidth: 120 }}>
                  Eliminar
                </TableCell>
                <TableCell align="right" style={{ minWidth: 120 }}>
                  Actualizar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsFilter.length > 0
                ? itemsFilter.map((item, index) => {
                    let urlImage: string = `data:image/JPG;base64,${item.picture}`;

                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <img
                            src={urlImage}
                            alt="img"
                            style={{ width: "82px", borderRadius: "5%" }}
                            onClick={() => handleOpenUpdateForm(true, item)}
                          />
                        </TableCell>
                        <TableCell align="right">{item.gender}</TableCell>

                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">{item.brand}</TableCell>
                        <TableCell align="right">
                          {item.active === 1 ? <b>Si</b> : <p>No</p>}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            onClick={() => handleOpenDeleteForm(true, item)}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          <button
                            onClick={() => handleOpenUpdateForm(true, item)}
                          >
                            <EditIcon />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : itemProduct.map((item, index) => {
                    let urlImage: string = `data:image/JPG;base64,${item.picture}`;

                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <img
                            src={urlImage}
                            alt="img"
                            style={{ width: "82px", borderRadius: "5%" }}
                            onClick={() => handleOpenUpdateForm(true, item)}
                          />
                        </TableCell>
                        <TableCell align="right">{item.gender}</TableCell>

                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">{item.brand}</TableCell>
                        <TableCell align="right">
                          {item.active === 1 ? <b>Si</b> : <p>No</p>}
                        </TableCell>
                        <TableCell align="right">
                          <button
                            onClick={() => handleOpenDeleteForm(true, item)}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </button>
                        </TableCell>
                        <TableCell align="right">
                          <button
                            onClick={() => handleOpenUpdateForm(true, item)}
                          >
                            <EditIcon />
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
