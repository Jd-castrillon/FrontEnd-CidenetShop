import React from 'react'

import WrapperFeaturedProducts from '../featuredProducts/WrapperFeaturedProducts'
import Navbar from '../header/Navbar'
import ImageHero from '../hero/ImageHero'
import WrapperSearchBox from '../searchBox/WrapperSearchBox'





const home = () => {
    return (
        <div>
            <Navbar />
            <ImageHero />
            <WrapperFeaturedProducts />
            <WrapperSearchBox />
        </div>
    )
}

export default home
