import React from 'react';
import { Redirect } from 'react-router-dom';

const AboutProducts = (props) => {
    return (
        (props.location.pathname === '/aboutProducts') ?
        // If cutomer goes to About Products section he will see that page is under construction.
            <h4>Atsiprašome ši puslapio dalis tvarkoma, tačiau pasirinkę Produktų skiltį galite naršyti per produktus</h4>
        //If customer goes through top navigation Link of Products, he will be showed with product list with default category.
            : <Redirect to='/categories/biciu_produktai' />
    )
}
    
export default AboutProducts;
