import React from 'react';
import './about.css';
import sertificate from '../../img/about/sertificate.webp';
import halal from '../../img/about/halal.webp';
import islamicSeal from '../../img/about/islamicSeal.webp';
import kosher from '../../img/about/kosher.webp';
import peta from '../../img/about/peta.webp';



const About = (props) => {
    const { aboutForeverProducts, aboutHalal, aboutKosher, aboutIslamicSeal, aboutPetaFree, aboutScienceSertificate } = props.paragraphs;
    return (
        <div className="about">
            <h2>Apie įmonę</h2>
            <div className="setWidth">
                <p>{aboutForeverProducts}</p>
            </div>
            <br className="clear" />
            <div className="setWidth">
                <p><img src={sertificate} alt="Sertificate"/>{aboutScienceSertificate}</p> 
            </div>
            <br className="clear" />
             <div className="setWidth">
                <p> <img src={peta} alt="Peta"/>{aboutPetaFree}</p>
            </div>
            <br className="clear" />

            <div className="setWidth">
                <p> <img src={islamicSeal} alt="Islamic Seal" />{aboutIslamicSeal}</p>
            </div>
            <br className="clear" /> 

            <div className="setWidth">
                <p><img src={kosher} alt="Kosher"/>{aboutKosher}</p>

            </div>
            <br className="clear" />

            <div className="setWidth">
                <p><img src={halal} alt="Halal"/>{aboutHalal}</p>
            </div>
            <br className="clear" />
            
        </div>
    )
}

export default About;