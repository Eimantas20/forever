import { render } from '@testing-library/react';
import { object } from 'prop-types';
import deleteButton from '../../img/delete-button.png'
import React, {Component, useEffect, useState} from 'react';
import { Link, useParams, useRouteMatch, useLocation, useHistory, Router, matchPath, withRouter  } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown.js';
// import Alert from './alert.js';
import './cart.css';


class Cart extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            productsInCart: [],
            totalPrice: 0,
            kebybis: {},
            deliveryOption: '',
            deliveryPrice: 0,
            enableButton: 'none',
            showWarning: false,
            terminals: '',
            value: '', 
            chosenTerminal: ''
        }
    }
    

    enableWarning= () => {
        this.setState({
            showWarning: true
        }, () => console.log(this.state.showWarning));
    }   

    goToDiscount = () => console.log(this.props.productList);

    componentDidMount = (props) => {
        this.gettingCartProducts(props);
    }

    gettingCartProducts = (props) => {
        let fromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
        let globalItemList = this.props.items;
        let newList = [];
        let globalItemListLength = Object.keys(globalItemList).length
        if (globalItemListLength > 0 && fromLocalStorage !== null) {
        // if (fromLocalStorage > 0) {
            fromLocalStorage.map(item => {
                globalItemList[item.id].quantity = item.quantity
                newList.push(globalItemList[item.id]);
            })
            this.setState({ productsInCart: newList }, () => this.genericPriceCalculation())
        }
    }

    onChangeValue = (event) => {
        const deliveryPrice = Number(event.target.value) ;
        this.genericPriceCalculation(deliveryPrice);
    }

    genericPriceCalculation = (deliveryPrice) => {
        const { productsInCart } = this.state;
        let cost = 0;
        productsInCart.forEach(product => {
            cost += product.quantity * product.price
        });
        this.setState({ totalPrice: Math.round((cost + (deliveryPrice || 0))*100)/100})
    }

//    renderAlert(message) {
//     return (
        
//         <div style={{zIndex: "100", height: "2000px", height: "200px", backgroundColor: "red"}}>
//             <h1>this is my second component</h1>
//         </div>
//     );
//     }


    getTerminals = () => {
        this.state.terminals == "" && 
        fetch('http://localhost:3000/terminals')
            .then((response)=>response.json())
            .then((response) => this.setState({terminals: response}))  
    }
    
    render() {
        console.log(this.state.productsInCart)
        return(
            (this.state.productsInCart.length > 0) ?
                
                <div className="cartBox">
                    <h4 className="testmeout">Tavo pirkinių krepšelis</h4>
                    {this.state.productsInCart.map(singleProduct => 
                    
                        <div className="singleProduct" key={singleProduct.id}>
                            <div>
                                <Link to={`/categories/${singleProduct.url}/${singleProduct.id}`} >
                                    <img className="productImageInCart" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
                                </Link>
                            </div>
                            <div className="miniDescription">
                                <h5>{singleProduct.name}</h5>
                                <p>€ {singleProduct.price}</p>
                                <p>{singleProduct.category}</p>
                            </div>
                            

                            <div className="quantities">
                                <div>
                                    <p className="amount">Kiekis</p>
                                    <button className="incDec" onClick={() => this.props.changeQuantities(singleProduct, -1)}>-</button>
                                    {singleProduct.quantity}
                                    <button className="incDec" onClick={() => this.props.changeQuantities(singleProduct, +1)}>+</button>
                                </div>
                                <button className="deleteOrderButton" onClick={() => this.props.changeQuantities(singleProduct, -100)}>Pašalinti prekę</button>
                                <img className="mobileDelete" src={deleteButton} alt="Pašalinti" />
                            </div>
                            </div>)}
                        <div className="sidePanel" >
                            <div>
                                <h4>Pasirinkite pristatymo būdą</h4>     
                                <form className="wrapper" onChange={this.onChangeValue}>
                                    <div className="alignDeliveryType" >
                                        <h5>Paštomatai:</h5>
                                        <label className="container">DPD €2.99
                                        <input onClick={()=>this.getTerminals()} type="radio" name="radio" value="2.99" onChange={() => this.setState({ chosenTerminal: 'dpd', value: '', deliveryOption: 'DPD paštomatas €2.99', deliveryPrice: 2.99 })} />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="container">LP express €2.99
                                        <input onClick={() => this.getTerminals()} type="radio" name="radio" value="2.99" onChange={() => this.setState({ chosenTerminal: 'lp', value: '', deliveryOption: 'LP express paštomatas €2.99', deliveryPrice: 2.99, enableButton: 'all', showWarning: false })}/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <label className="container">Omniva €2.99
                                        <input onClick={() =>this.getTerminals()} type="radio" name="radio" value="2.99" onChange={() => this.setState({ chosenTerminal: 'omniva', value: '', deliveryOption: 'Omniva paštomatas €2.99', deliveryPrice: 2.99, enableButton: 'all', showWarning: false })}/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="alignDeliveryType">
                                        <h5>Kurjeris:</h5>
                                        <label className="container">DPD €5.99
                                        <input type="radio" name="radio" value="5.99" onChange={() => this.setState({ choosenTerminal: '', terminals: '', value: 'DPD Kurjeris', deliveryOption: 'DPD Kurjeris €5.99', deliveryPrice: 5.99, enableButton: 'all', showWarning: false})} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div>
                                        <Dropdown 
                                            options={this.state.terminals[this.state.chosenTerminal]}
                                            prompt='Pasirinkite paštomata' 
                                            value={this.state.value}
                                            onChange={value => this.setState({value})}
                                        />
                                    </div> 
                                </form>
                               
                            {this.state.showWarning? <p className="warning">Prašome pasirinkti pristatymo būdą</p>:null}
                            </div>
                            <hr />
                            <div>
                                <h4> Kaina: € {this.state.totalPrice}</h4>
                            </div>
                            <br />
                            <a className="discount" href="https://registracija.foreverliving.lt/lt/?fbclid=IwAR3li4MXHZeTX36_ASx3XW-239g7a4ldbQAgPSEeO7V6rLaagG_VfIVL8cI">5% nuolaida su registracija perkant virš €50 </a>
                            <br />

                                {/* <Link onClick={() => this.enableWarning()} style={{ pointerEvents: this.state.enableButton }}  to={{ pathname: "/checkout", state: { productsInCart: this.state.productsInCart, totalPrice: this.state.totalPrice, deliveryOption: this.state.deliveryOption } }}>
                            <button className="orderButton" onClick={() => this.enableWarning()}>
                            
                                    Pirkti
                            </button>
                                </Link> */}

                            {/* <Link style={{ pointerEvents: this.state.enableButton }} to={{ pathname: "/checkout", state: { productsInCart: this.state.productsInCart, totalPrice: this.state.totalPrice, deliveryOption: this.state.deliveryOption } }}>
                        <button className="orderButton" onClick={()=>this.enableWarning()}>
                                Pirkti
                        </button>
                            </Link> */}

                        {/* {this.state.showWarning ?
                            <Popup
                                text='Close Me'
                                closePopup={this.enableWarning()}
                            />
                            : null
                        } */}

                        <Link onClick={(e) =>  this.state.value == ''? (e.preventDefault(), this.enableWarning()) : null} to={{ pathname: "/checkout", state: { productsInCart: this.state.productsInCart, totalPrice: this.state.totalPrice, deliveryOption: this.state.value, deliveryPrice: this.state.deliveryPrice } }}>
                            <button className="orderButton">
                                Pirkti
                            </button>
                        </Link>

                    </div>
                </div>
                
            : <h2 style={{paddingTop:"50px"}}>Jūsų pirkinių krepšelis yra tuščias</h2>         
        )
    }
}

export default Cart;

{/* <Link to="/checkout" productsInCart={this.state.poroductsInCart}><button  className="orderButton">Pirkti</button></Link> */ }
{/* <Link to={this.state.deliveryOption ? { pathname: "/checkout", state: { productsInCart: this.state.productsInCart, totalPrice: this.state.totalPrice, deliveryOption: this.state.deliveryOption } }
                                : ()=>{alert('haha')} }> */}
{/* <Link style={{pointerEvents: this.state.enableButton}}  to={{ pathname: "/checkout", state: { productsInCart: this.state.productsInCart, totalPrice: this.state.totalPrice, deliveryOption: this.state.deliveryOption } }}>
                                <button className="orderButton" >
                                Pirkti
                                </button>
                            </Link> */}