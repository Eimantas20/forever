import React from 'react';
import './businessOpportunity.css'; 
import businessWomanImg from '../../Img/business_woman.jpg';
import silverPenImg from '../../Img/silver_pen.jpg';

const BusinessOpportunity = (props) => {
    const { businessOpportunity, businessOpportunity2 } = props.paragraphs;
    return (    
        <div className="businessOpLayout">
            <h2>{'Verslo galimybė'}</h2>
            <div>
                <img className="businessWomanImg" src={businessWomanImg} alt="Business Woman"/>
                <p>{businessOpportunity}</p>
            </div>
            <div>
                <img className="silverPenImg" src={silverPenImg} alt="Silver pen inside journal" />
                <p>{businessOpportunity2}</p>
            </div>
            
          
        </div>
    )
}

export default BusinessOpportunity;