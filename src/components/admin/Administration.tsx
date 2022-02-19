import React,{ useState } from 'react';
import NavigateBar from '../header/NavigateBar';
import TableProducts from './TableProducts';
import AddIcon from '@mui/icons-material/Add';
import AddProductForm from '../forms/AddProductForm';

const Administration = () => {

    const [showAddForm, setShowAddForm] = useState(false);

    const hanleCloseAddForm = () =>{
        setShowAddForm(false)
    } 

    if(showAddForm){
        return <AddProductForm open={showAddForm} handleClose={hanleCloseAddForm}/>
    }

    return (
        <div className="">
            <NavigateBar />
            <h1>Aca vamos a administrar los productos</h1>
            <button onClick={() => setShowAddForm(true)}><AddIcon /> Agregar Producto</button>
            <TableProducts />
        </div>
    );
};

export default Administration;
