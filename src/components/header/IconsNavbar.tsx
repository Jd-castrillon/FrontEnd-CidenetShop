import React from 'react'
import IconCart from '../layout/IconCart'
import IconCidenet from '../layout/IconCidenet'
import IconSearch from '../layout/IconSearch'

const SearchCar = () => {
    return (
        <div className="navbar-icons flex flex-jc-sb">
            <div className=""><IconSearch /></div>
          
            <div className=""><IconCart /></div>
        </div>
    )
}

export default SearchCar
