import { object } from 'prop-types';
import React, {Component, useEffect, useState} from 'react';
import './cart.css';


class Cart extends Component {
   
    constructor(props) {
        super(props);
        // console.logs(props)
        this.state = {
            productsInCart: [],
            price: 0,
            kebybis: {}
        }
    }

    goToDiscount = () => console.log(this.props.productList);

    componentDidMount = (props) => {
        this.gettingCartProducts(props);
    }

    gettingCartProducts = (props) => {
        let fromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
        let newList = [];
        let newestList = [];
        let globalItemList = this.props.items;
        console.log(globalItemList)
        console.log(fromLocalStorage)
        let globalItemListLength = Object.keys(globalItemList).length
        console.log(globalItemListLength)

        if (globalItemListLength > 0 && fromLocalStorage !== null) {
        // if (fromLocalStorage > 0) {
            console.log(globalItemList)
            fromLocalStorage.forEach(item => {
                globalItemList[item.id].quantity = item.quantity

                newList.push(globalItemList[item.id]);
            })
            this.setState({ productsInCart: newList }, () => this.genericPriceCalculation())
        }
    }

    genericPriceCalculation = () => {
        const { productsInCart, price } = this.state;
        let cost = 0;
        productsInCart.forEach(product => {
            cost += product.quantity * product.price
        })
        this.setState({ price: Math.round(cost * 100) / 100 })
    }

    // increase = (singleProduct) => {
    //     if (singleProduct.quantity < 10) {
    //         const { productsInCart, price} = this.state;
    //         let currentQuantity = productsInCart.find(product => product.id == singleProduct.id).quantity
    //         productsInCart.find(product => product.id == singleProduct.id).quantity = currentQuantity + 1;
    //         this.setState({ productsInCart }, () => this.genericPriceCalculation())
    //         localStorage.setItem('testing', Math.random())
    //         // localStorage.setItem('cartItems', JSON.stringify(oldItems))
    //         // const cost = price + singleProduct.price;
    //         // this.roundUpPrice(cost);
    //     }    
    // }

    // decrease = (singleProduct) => {
    //     if ( singleProduct.quantity > 1) {
    //         const { productsInCart, price } = this.state;
    //         let currentQuantity = productsInCart.find(product => product.id == singleProduct.id).quantity
    //         productsInCart.find(product => product.id == singleProduct.id).quantity = currentQuantity - 1;
    //         this.setState({ productsInCart }, () => this.genericPriceCalculation())
    //         // this.roundUpPrice(cost);
    //     }  
    // }

    // delete = (singleProduct) => {
    //     this.props.deleteItem(singleProduct);
    //     this.genericPriceCalculation();
    // }

    render() {
        console.log('cart.js got rerendered')
        return(
            (this.state.productsInCart.length > 0) ?
                <div>
                    <div className="cartBox">
                    <h1>Tavo pirkinių krepšelis</h1>
                    {this.state.productsInCart.map(singleProduct => 
                        <div className="singleProduct" key={singleProduct.id} >
                            <h1>{singleProduct.name}</h1>
                            <p>€ {singleProduct.price}</p>
                            <h3>{singleProduct.description}</h3>
                            <div className="quanities">
                                <div>
                                    <p style={{display: "inline-block"}}>Kiekis</p>
                                    <button className="incDec" onClick={() => this.props.changeQuantities(singleProduct, -1)}>-</button>
                                    {singleProduct.quantity}
                                    <button className="incDec" onClick={() => this.props.changeQuantities(singleProduct, +1)}>+</button>
                                </div>
                                <button className="deleteProduct" onClick={() => this.props.changeQuantities(singleProduct, -100)}>Pašalinti prekę</button>
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
            : <h2>Jūsų pirkinių krepšelis yra tuščias</h2>         
        )
    }
}

export default Cart;