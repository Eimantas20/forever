import React, {Component} from 'react';
import './cart.css';

class Cart extends Component {
    constructor() {
        super();
        window.OneProductCard = this;
   
    }

//     const productsInCart = [];

//     function addToCart() {
//     productsInCart.push(id)
//     console.log(productsInCart);
// }


   addToCart = () => console.log("works???")
    
    render() {

        return(
            <div>
                Tavo pirkinių krepšelis
                <a href="https://registracija.foreverliving.lt/lt/?fbclid=IwAR3li4MXHZeTX36_ASx3XW-239g7a4ldbQAgPSEeO7V6rLaagG_VfIVL8cI">5% nuolaida</a>
            </div>


        )
    }


}

export default Cart;