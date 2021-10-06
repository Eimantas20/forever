import React, { Component, useEffect } from 'react';
import './about.css';
import sertificate from '../../img/about/sertificate.webp';
import halal from '../../img/about/halal.webp';
import islamicSeal from '../../img/about/islamicSeal.webp';
import kosher from '../../img/about/kosher.webp';
import peta from '../../img/about/peta.webp';

import silverPenImg from '../../img/silver-pen.jpg';


const About = (props) => {
    const { aboutForeverProducts, aboutHalal, aboutKosher, aboutIslamicSeal, aboutPetaFree, aboutScienceSertificate } = props.paragraphs;
    console.log(props)
    return (
        <div className="about">
            <h2>Apie įmonę</h2>
            <div className="setWidth">
                <p>{aboutForeverProducts}</p>
            </div>
            <br className="clear" />
            <div className="setWidth">
                <p><img src={sertificate}/>{aboutScienceSertificate}</p> 
            </div>
            <br className="clear" />
             <div className="setWidth">
                <p> <img src={peta} />{aboutPetaFree}</p>
            </div>
            <br className="clear" />

            <div className="setWidth">
                <p> <img src={islamicSeal} />{aboutIslamicSeal}</p>
            </div>
            <br className="clear" /> 

            <div className="setWidth">
                <p><img src={kosher} />{aboutKosher}</p>

            </div>
            <br className="clear" />

            <div className="setWidth">
                <p><img src={halal} />{aboutHalal}</p>
            </div>
            <br className="clear" />

        </div>
    )
}

export default About;