import deleteButton from '../../img/delete-button.png'
import React, {Component} from 'react';
import { Link  } from 'react-router-dom';
import Dropdown from './Dropdown/dropdown.js';
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
            terminalLocation: '',
            chosenTerminal: '',
            allowAcces: false
        }
    }

    enableWarning= () => {
        this.setState({
            showWarning: true
        });
    }   

    componentDidMount = (props) => {
        this.gettingCartProducts(props);
    }

    gettingCartProducts = (props) => {
        let fromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
        let globalItemList = this.props.productsList;
        let newList = [];
        let productProperCopy;
        let globalItemListLength = Object.keys(globalItemList).length
        if (globalItemListLength > 0 && fromLocalStorage !== null) {
            fromLocalStorage.forEach(item => {
                //Must make a deep product copy in order for it to lose reffernce to old one, and not to mix up the flavors and quantities.
                productProperCopy = JSON.parse(JSON.stringify(globalItemList[item.id]));
                productProperCopy.quantity = item.quantity;
                productProperCopy.desiredFlavor = item.desiredFlavor
                newList.push(productProperCopy);
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
            cost += product.quantity *product.price
        });
        this.setState({ totalPrice: (Math.round((cost + (deliveryPrice || 0)) * 100) / 100).toFixed(2) })
    }

    getTerminals = () => {
        this.state.terminals === "" && 
        fetch('http://192.168.1.231:3000/terminals')
            .then((response)=>response.json())
            .then((response) => this.setState({terminals: response}))  
    }
    
    render() {
        return(
            (this.state.productsInCart.length > 0) ?
                <div className="cartBox">
                    <h4 className="testmeout">Tavo pirkinių krepšelis</h4>
                    {this.state.productsInCart.map(singleProduct => 
                        <div className="singleProduct" key={Math.random()}>
                    {/* Key is set to Math.Random as temporary solution, no other unique key available from products */}
                            <div>
                                <Link to={`/categories/${singleProduct.url}/${singleProduct.id}`} >
                                    <img className="productImageInCart" src={singleProduct.picture} alt="Product" />
                                </Link>
                            </div>
                            <div className="miniDescription">
                                <h5>{singleProduct.name}</h5>
                                <p>€ {singleProduct.price}</p>
                                <p>{singleProduct.category}</p>
                                <p className={singleProduct.desiredFlavor === null ? 'hide' : 'show'}>{singleProduct.desiredFlavor}</p> 
                            </div>
                            <div className="quantities">
                                <div>
                                    <p className="amount">Kiekis</p>
                                    <button className="incDec" onClick={() => this.props.changeQuantities(singleProduct, -1)}>-</button>
                                    {singleProduct.quantity}
                                    <button className="incDec" onClick={() => this.props.changeQuantities(singleProduct, +1)}>+</button>
                                </div>
                                <button className="deleteOrderButton" onClick={() => this.props.changeQuantities(singleProduct, -100)}>Pašalinti prekę</button>
                                <img className="mobileDelete" src={deleteButton} alt="Pašalinti" onClick={() => this.props.changeQuantities(singleProduct, -100)} />
                            </div>
                        </div>
                    )}
                    <div className="sidePanel" >
                        <div>
                            <h4>Pasirinkite pristatymo būdą</h4>     
                            <form className="wrapper" onChange={this.onChangeValue}>
                                <div className="alignDeliveryType" >
                                    <h5>Paštomatai:</h5>
                                    <label className="container">DPD €2.99
                                        <input onClick={() => this.getTerminals()} type="radio" name="radio" value="2.99" onChange={() => this.setState({ allowAcces: false, terminalLocation: '', chosenTerminal: 'dpd', deliveryOption: 'DPD paštomatas €2.99', deliveryPrice: 2.99 })} />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">LP express €2.99
                                        <input onClick={() => this.getTerminals()} type="radio" name="radio" value="2.99" onChange={() => this.setState({ allowAcces: false, terminalLocation: '', chosenTerminal: 'lp', deliveryOption: 'LP express paštomatas €2.99', deliveryPrice: 2.99, enableButton: 'all', showWarning: false })}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="container">Omniva €2.99
                                        <input onClick={() => this.getTerminals()} type="radio" name="radio" value="2.99" onChange={() => this.setState({ allowAcces: false, terminalLocation: '', chosenTerminal: 'omniva', deliveryOption: 'Omniva paštomatas €2.99', deliveryPrice: 2.99, enableButton: 'all', showWarning: false })}/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className="alignDeliveryType">
                                    <h5>Kurjeris:</h5>
                                    <label className="container">DPD €5.99
                                    <input type="radio" name="radio" value="5.99" onChange={() => this.setState({ allowAcces: true, choosenTerminal: '', terminals: '', deliveryOption: 'DPD Kurjeris €5.99', deliveryPrice: 5.99, enableButton: 'all', showWarning: false})} />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div>
                                    <Dropdown
                                        options={this.state.terminals[this.state.chosenTerminal]}
                                        prompt='Pasirinkite paštomata' 
                                        value={this.state.terminalLocation}
                                        onChange={value => this.setState({ terminalLocation: value, allowAcces: true})}
                                    />
                                </div> 
                            </form>
                            {this.state.showWarning ? <p className="warning">Prašome pasirinkti pristatymo būdą</p> : null}
                        </div>
                        <hr />
                        <div>
                            <h4> Kaina: € {this.state.totalPrice}</h4>
                        </div>
                        <br />
                        <a className="discount" href="https://registracija.foreverliving.lt/lt/?fbclid=IwAR3li4MXHZeTX36_ASx3XW-239g7a4ldbQAgPSEeO7V6rLaagG_VfIVL8cI">5% nuolaida su registracija perkant virš €50 </a>
                        <br />
                        <Link onClick={(e) =>  this.state.allowAcces === false ? (e.preventDefault(), this.enableWarning()) : null} to={{ pathname: "/checkout", state: { productsInCart: this.state.productsInCart, totalPrice: this.state.totalPrice, deliveryOption: this.state.deliveryOption, terminalLocation: this.state.terminalLocation,deliveryPrice: this.state.deliveryPrice } }}>
                            <button className="orderButton">
                                Pirkti
                            </button>
                        </Link>
                    </div>
                </div>    
            : <h2 className="emptyCart">Jūsų pirkinių krepšelis yra tuščias</h2>         
        )
    }
}

export default Cart;