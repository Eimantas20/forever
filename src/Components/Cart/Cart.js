import { object } from 'prop-types';
import React, {Component} from 'react';
import './cart.css';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsInCart: this.props.productList,
            price: 0
        }
        // this.deleteItem = this.deleteItem.bind(this);
    }

    goToDiscount = () => console.log(this.props.productList)

    componentDidMount = () => {
        this.genericPriceCalculation();
    }


    genericPriceCalculation = () => {
        const { productsInCart, price } = this.state;
        let cost = 0;
        productsInCart.forEach(product => {
            cost += product.quantity * product.price
        })
        this.setState({ price: Math.round(cost * 100) / 100 })
        // console.log(price)
    }

    increase = (singleProduct) => {
        if (singleProduct.quantity < 10) {
            const { productsInCart, price} = this.state;
            let currentQuantity = productsInCart.find(product => product.id == singleProduct.id).quantity
            productsInCart.find(product => product.id == singleProduct.id).quantity = currentQuantity + 1;
            this.setState({ productsInCart }, () => this.genericPriceCalculation())
            // const cost = price + singleProduct.price;
            // this.roundUpPrice(cost);
        }    
    }

    decrease = (singleProduct) => {
        if ( singleProduct.quantity > 1) {
            const { productsInCart, price } = this.state;
            let currentQuantity = productsInCart.find(product => product.id == singleProduct.id).quantity
            productsInCart.find(product => product.id == singleProduct.id).quantity = currentQuantity - 1;
            this.setState({ productsInCart }, () => this.genericPriceCalculation())
            // this.roundUpPrice(cost);
        }  
    }

    delete = (singleProduct) => {
        this.props.deleteItem(singleProduct);
        this.genericPriceCalculation();
    }

    render() {
        return(
            <div> 
            {this.state.productsInCart.length == 0 ? (
                <h2>Jūsų pirkinių krepšelis yra tuščias</h2>
            ) : (
                <div>
                    <div className="cartBox">
                    <h1>Tavo pirkinių krepšelis</h1>
                    {this.props.productList.map(singleProduct => <div className="singleProduct" key={singleProduct.id} >
                        <h1>{singleProduct.name}</h1>
                        <p>€ {singleProduct.price}</p>
                        <h3>{singleProduct.description}</h3>
                        <div className="quanities">
                            <div>
                                <p style={{display: "inline-block"}}>Kiekis</p>
                                <button className="incDec" onClick={() => this.decrease(singleProduct)}>-</button>
                                {singleProduct.quantity}
                                <button className="incDec" onClick={() => this.increase(singleProduct)}>+</button>
                            </div>
                            <button className="deleteProduct" onClick={()=> this.delete(singleProduct)}>Pašalinti prekę</button>
                        </div>
                </div>)}


                    <div className="sidePanel">
                        <div>
                            <h4> Kaina: € {this.state.price}</h4>
                        </div>
                        <br />
                        <a href="https://registracija.foreverliving.lt/lt/?fbclid=IwAR3li4MXHZeTX36_ASx3XW-239g7a4ldbQAgPSEeO7V6rLaagG_VfIVL8cI">5% nuolaida su registracija</a>
                        <br />
                        <button onClick={this.goToDiscount}>Pirkti</button>
                    </div>
                </div>
                </div> 
            )}
            </div>
                 
          
             
         

        
          
            
        
 )
}
}

export default Cart;