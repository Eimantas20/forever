import React, { Component, useEffect } from 'react';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
    Link,
    useRouteMatch
 } from 'react-router-dom';
import './App.css';
import Random from './Components/NavigationBar/NavigationBar.js';
import About from './Components/About/About.js';
import AllProducts from './Components/Products/AllProducts.js';
import Contacts from './Components/Contacts/Contacts.js';
import Cart from './Components/Cart/Cart.js';
import foreverLogo from './Infinity.png';
import basketIcon from './img/basket-icon.png';
import mailIcon from './img/mail.png';
import facebook from './img/facebook.png';
import instagram from './img/instagram.png';
import '../src/Components/NavigationBar/NavigationBar.css';
import './App.css';

import OneProductCard from './Components/Products/OneProductCard';
import CategoryRouter from './Components/Products/CategoryRouter.js';
import FullProductDescription from './Components/Products/FullProductDescription.js'
import { render } from '@testing-library/react';


class App extends Component {
    constructor(props) {
        super(props);
        this.changeQuantities = this.changeQuantities.bind(this);
        this.state = {
            route: '',
            productsInCart: [],
            items: [],
            cartItemCount: 0,
            clicked: 1       
        }
    }
    // Be sito routas irgi lyg veikia, bet po refresho state su produktais nusinulina ir sauna i if'a :/ nzn kaip bus su krepseliu
    componentDidMount = () => {
        console.log('App.js');
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((response) => {
                let newList = {};
              
                response.data.forEach(item => {
                    newList[item.id] = item;
                })
                this.setState({items: newList})
            })
        this.updateCartItemsCount()
    }
   
    newTestFunction = () => {
        console.log('newTestFunction trigered');
        this.setState({ clicked: this.state.clicked + 1 }, () => console.log(this.state.clicked))
    }

    updateCartItemsCount = () => {
        let itemsInsideLocalStorage = JSON.parse(localStorage.getItem('cartItems'))
        if (itemsInsideLocalStorage) 
            this.setState({ productsInCart: itemsInsideLocalStorage, cartItemCount: itemsInsideLocalStorage.length})
    }
    
    

    changeQuantities = (singleProduct, number) => {
        let localStorageProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (number == 1) {
            if (localStorageProducts.find(product => (product.id == singleProduct.id && singleProduct.quantity < 10))) {
                let currentQuantity = localStorageProducts.find(product => product.id == singleProduct.id).quantity;
                localStorageProducts.find(product => product.id == singleProduct.id).quantity = currentQuantity + 1
            }

        } else if (number == -1) {
            if (localStorageProducts.find(product => product.id == singleProduct.id && singleProduct.quantity > 1)) {
                let currentQuantity = localStorageProducts.find(product => product.id == singleProduct.id).quantity;
                localStorageProducts.find(product => product.id == singleProduct.id).quantity = currentQuantity - 1
            }

        } else if (number == -100) {
            if (localStorageProducts.findIndex(item => item.id === singleProduct.id) > -1) {
                localStorageProducts.splice(localStorageProducts.findIndex(item => item.id === singleProduct.id), 1)
            }
           
        } else if (number == 100) {
            if (!localStorageProducts.find(product => product.id == singleProduct.id)) {
                let newItem = {
                    'id': singleProduct.id,
                    'quantity': 1
                };
                localStorageProducts.push(newItem);

            } else if (localStorageProducts.find(product => product.id == singleProduct.id && product.quantity < 10)) {
                let currentQuantity = localStorageProducts.find(product => product.id == singleProduct.id).quantity;
                localStorageProducts.find(product => product.id == singleProduct.id).quantity = currentQuantity + 1
            }
        }
        localStorage.setItem('cartItems', JSON.stringify(localStorageProducts))
        this.setState({ itemsInsideBasket: JSON.stringify(localStorageProducts) })
        this.updateCartItemsCount();
        this.gettingCartProducts();
    }

    gettingCartProducts = (props) => {

        let fromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
        let newList = [];
        let globalItemList = this.state.items;

        let globalItemListLength = Object.keys(globalItemList).length
        if (globalItemListLength > 0) {
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

    render() {
        console.log('rerender App.js')
    //    let cartItemCount =JSON.parse(localStorage.getItem('cartItems')).length - 1;
        // console.log(this.state.cartItemCount.length || 0)
        return (
            <Router>
                <div className="App">
                    <nav>
                        <ul className='ulStyle'>
                            <li className='listItem'>
                                <Link to="/">Pradžia</Link>
                            </li>
                            <li className='listItem'>
                                <Link to="/About">Verslo galimybė</Link>
                            </li>
                            <li className='listItem'>
                                <Link to="/categories/">Produktai</Link>
                            </li>
                            <li className='listItem floatRight'>
                                <Link to="/Contacts">Kontaktai</Link>
                            </li>
                            <li className='listItem floatRight deleteItem={this.deleteItem}'>
                                <Link to="/Cart">
                                    <div>
                                        {/* <div className="cartItems"><p className="cartText">{this.state.productsInCart.length}</p></div> */}
                                        <div className="cartItems"><p className="cartText">{this.state.cartItemCount}</p></div>

                                        <img style={{ width: '30px', background: 'transparent' }} src={basketIcon} alt={'Cart Icon'} />
                                    </div>
                                </Link>  
                            </li>
                        </ul>
                    </nav>      
                    <img style={{width:'100px', 'paddingTop': '50px', display:'block', 'zIndex':'100'}} src={foreverLogo} alt={'Forever Logo'} />
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>

                    <Route strict path="/categories/" component={(props) => <CategoryRouter  stocks={this.state.productsInCart} />} />
                    <Route path="/categories/:category/:id" component={(props) => <FullProductDescription {...props} newTestFunction={this.newTestFunction} clicked={this.state.clicked} changeQuantities={this.changeQuantities} productsInCart={this.state.productsInCart} genericPriceCalculation={this.genericPriceCalculation}  addNCount={this.addNCount} addToBasket={this.addToBasket} products={this.state.items} />} />
                    <Route exact strict path='/categories/:category' component={(props) => <AllProducts changeQuantities={this.changeQuantities} addNCount={this.addNCount} key={window.location.pathname} products={this.state.items} addToBasket={this.addToBasket} updateCartItemsCount={this.updateCartItemsCount} />} />
                    
                    <Route path="/Contacts">
                        <Contacts kintamasis="pirmasis" />
                    </Route>
                    <Route path="/Cart" component={(props) => <Cart changeQuantities={this.changeQuantities} genericPriceCalculation={this.genericPriceCalculation} addToBasket={this.addToBasket} deleteItem={this.deleteItem} items={this.state.items} productList={this.state.productsInCart} updateCartItemsCount={this.updateCartItemsCount} />} />
                    {/* <Route path="/Cart">
                        <Cart addToBasket={this.addToBasket} deleteItem={this.deleteItem} items={this.state.items}  productList={this.state.productsInCart} />
                    </Route> */}
                    <div className="footerHoldInPlace">
                        <footer>
                            <div className="footer">
                                <a href="#">Vizija</a>
                                <Link to="/">Apie produktus</Link>
                                <Link to="/About">Verslo galimybė</Link>
                                <a href="#">Siuntimas</a>
                                <div className="breakAfter">
                                    <Link to="/Contacts">Kontaktai</Link>  
                                    <a href="daivagusevaite@gmail.com"><img style={{ width: '30px', marginLeft: '10px'}} src={mailIcon} alt={'Mail Icon'} /></a>
                                    <a href="https://www.facebook.com/groups/152164343511570"><img style={{ width: '30px', marginLeft: '10px' }} src={facebook} alt={'Facebook icon'} /></a>
                                    <a href="https://www.instagram.com/daivagusevaite/?hl=en"><img style={{ width: '30px', marginLeft: '10px' }} src={instagram} alt={'Instagram icon'} /></a>
                                </div>
                                <div className="break"></div>
                               
                                <p> © 2021 Visos teisės saugomos</p>
                            </div>
                            
                           
                        </footer>                  
                    </div>
                </div>
           </Router>
        )
    }
}

class Home extends Component {
   
    
    render() {

        return(
            <div>
                <h1>Home2</h1>
            </div>
        )
    }
        
}



const House =(props) => {
   let {path, url} = useRouteMatch();

    return(
        <h1>Like so</h1>
       
    )
   
}

export default App;