import React from 'react'
import SectionProducts from '../featuredProducts/SectionProducts'
import Navbar from '../header/Navbar'
import ImageHero from '../hero/ImageHero'



const home = () => {
    return (
        <div>
            <Navbar />
            <ImageHero />
            <SectionProducts />
        </div>
    )
}

export default home
