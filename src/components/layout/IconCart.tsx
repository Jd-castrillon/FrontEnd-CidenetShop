import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../../styles/_globals.scss';

const IconCart = () => {
    return (
        <div>
            <a className="button" type="button" style={{textDecoration:"none"}}>
                <ShoppingCartOutlinedIcon  />
            </a>
        </div>
    )
}

export default IconCart
