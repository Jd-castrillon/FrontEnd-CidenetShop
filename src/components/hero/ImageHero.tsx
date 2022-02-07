import React from "react";
import "../../styles/_hero.scss";

interface Props {

  sectionImage: string;
}


const ImageHero = ({ sectionImage } : Props) => {
  const section =  `hero-${sectionImage}`
  return <div className={section}></div>;
};

export default ImageHero;
