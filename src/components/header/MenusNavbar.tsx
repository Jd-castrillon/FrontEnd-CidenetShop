import React from 'react'
import IconMenuOutLine from '../layout/IconMenuOutLine'
import SelectManWoman from '../layout/SelectManWoman'
import '../../styles/_globals.scss';

const MenusNavbar = () => {
    return (
        <div className="flex flex-jc-sb">
            <IconMenuOutLine />
            <SelectManWoman />
        </div>
    )
}

export default MenusNavbar
