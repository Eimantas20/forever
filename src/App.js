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
import BusinessOpportunity from './Components/businessOpportunity/BusinessOpportunity.js';
import AllProducts from './Components/Products/AllProducts.js';
import Contacts from './Components/Contacts/Contacts.js';
import Cart from './Components/Cart/Cart.js';
import foreverLogo from './Infinity.png';
import basketIcon from './img/basket-icon.png';
import hamburgerIcon from './img/hamburger_icon.png'
import mailIcon from './img/mail.png';
import facebook from './img/facebook.png';
import instagram from './img/instagram.png';
import Aloe from './img/Aloe.jpg';
import profilePic from './img/profilePic.jpg';
import '../src/Components/NavigationBar/NavigationBar.css';
import './App.css';
import Checkout from './Components/Checkout/Checkout.js';

import OneProductCard from './Components/Products/OneProductCard';
import CategoryRouter from './Components/Products/CategoryRouter.js';
import FullProductDescription from './Components/Products/FullProductDescription.js'
import { render } from '@testing-library/react';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '',
            productsInCart: [],
            items: [],
            cartItemCount: 0,
            clicked: 1,
            count: 0,
            paragraphs: ''
            // productsInCart: []
        }
    }
    componentDidMount = () => {
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((response) => {
                const paragraphs = response.text[0];
                let productsFromDB = {};
                let newList = [];
                response.data.forEach(item => {
                    productsFromDB[item.id] = item;
                })
                let oldItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                oldItems.forEach(item => {
                    productsFromDB[item.id].quantity = item.quantity
                    newList.push(productsFromDB[item.id]);
                })
                this.setState({ items: productsFromDB, productsInCart: newList, paragraphs }, () => this.updateCartItemsCount())
            })        
    }

    

    changeQuantities = (singleProduct, number) => {
        console.log('changeQuantities from fuckinApp.js has started')
        let oldItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let newList = [];
        let globalItemList = this.state.items;
        let globalItemListLength = Object.keys(globalItemList).length;
        let cost = 0;
        if (number == 1) {
            if (oldItems.find(product => (product.id == singleProduct.id && singleProduct.quantity < 10))) {
                let currentQuantity = oldItems.find(product => product.id == singleProduct.id).quantity;
                oldItems.find(product => product.id == singleProduct.id).quantity = currentQuantity + 1
            }

        } else if (number == -1) {
            if (oldItems.find(product => product.id == singleProduct.id && singleProduct.quantity > 1)) {
                let currentQuantity = oldItems.find(product => product.id == singleProduct.id).quantity;
                oldItems.find(product => product.id == singleProduct.id).quantity = currentQuantity - 1
            }

        } else if (number == -100) {
            if (oldItems.findIndex(item => item.id === singleProduct.id) > -1) {
                oldItems.splice(oldItems.findIndex(item => item.id === singleProduct.id), 1)
                console.log(oldItems)
            }

        } else if (number == 100) {
            if (!oldItems.find(product => product.id == singleProduct.id)) {
                let newItem = {
                    'id': singleProduct.id,
                    'quantity': 1
                };
                oldItems.push(newItem);

            } else if (oldItems.find(product => product.id == singleProduct.id && product.quantity < 10)) {
                let currentQuantity = oldItems.find(product => product.id == singleProduct.id).quantity;
                oldItems.find(product => product.id == singleProduct.id).quantity = currentQuantity + 1
            }
        }

        if (globalItemListLength > 0) {
            console.log(oldItems)
            //reik idet catcha jei nesufaidina ID nes kitaip objekta visvien ipushina i newList ir paskui bybis veikia
            oldItems.forEach(item => {
                globalItemList[item.id].quantity = item.quantity
                newList.push(globalItemList[item.id]);
            })
   
            newList.forEach(product => {
                cost += product.quantity * product.price
            })
            
        }
        if (oldItems) 
            console.log('paleido ir sita')
            localStorage.setItem('cartItems', JSON.stringify(oldItems))
            this.setState({ price: Math.round(cost * 100) / 100, productsInCart: newList, itemsInsideBasket: JSON.stringify(oldItems), cartItemCount: oldItems.length  })
        

    }

    updateCartItemsCount = () => {
        let itemsInsideLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
        
        if (itemsInsideLocalStorage)
            // this.setState({ productsInCart: itemsInsideLocalStorage, cartItemCount: itemsInsideLocalStorage.length })
            this.setState({cartItemCount: itemsInsideLocalStorage.length })

    }

    openMenu = () => {
        const nav = document.getElementById('topNav');
        if(nav.className === "ulStyle") {
            nav.className += " responsive";
        } else {
            nav.className = "ulStyle";
        }
    }

    openMenuForCart = () => {
        const nav = document.getElementById('topNav');
        if(nav.className === "ulStyle") {
            return null
        } else if(nav.className === "ulStyle responsive"){
            console.log('haha')
            nav.className = 'ulStyle';
        }
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <nav>
                        <ul className='ulStyle' id='topNav'>
                            <Link className="dirToHome" to="/"><p>Dibutes Alavijai</p> </Link>
                            <Link onClick={() => this.openMenu()} to="/"><li className='listItem'>Pradžia</li></Link>
                            <Link onClick={() => this.openMenu()} to="/businessOpportunity"><li className='listItem'>Verslo galimybė</li></Link>
                            <Link onClick={() => this.openMenu()} to="/categories/"><li className='listItem'>Produktai</li></Link>
                            <Link onClick={() => this.openMenu()} to="/Contacts"><li className='listItem floatRight'>Kontaktai </li></Link>
                            <Link onClick={() => this.openMenuForCart()} tabIndex="0"  to="/cart">
                                <li className='listItem floatRight deleteItem={this.deleteItem}'>
                                    <div style={{position: "relative", width: "40px", margin: "auto"}}>
                                        <div className="cartItems"><p className="cartText">{this.state.cartItemCount}</p></div>
                                        <img style={{ width: '30px', background: 'transparent' }} src={basketIcon} alt={'Cart Icon'} />
                                    </div>
                                </li> 
                            </Link>
                            <li className="icon" >
                                <img onClick={() => this.openMenu()} style={{ width: '50px', 'zIndex': '100' }} src={hamburgerIcon} alt={'Menu img'} />
                            </li>
                        </ul>
                    </nav>
                    <Link to="/">
                        <h1 className="projectName">Alavijo Produktai</h1>
                    </Link>
                    {/* <img className="logoStyle" src={foreverLogo} alt={'Forever Logo'} /> */}
                    <Route path="/" exact>
                        <Home paragraphs={this.state.paragraphs} />
                    </Route>
                    <Route exact strict path="/businessOpportunity">
                        <BusinessOpportunity businessOpportunity={this.state.paragraphs.businessOpportunity} />
                    </Route>
                    <Route path="/checkout" render={(props) => <Checkout />}/>
                    <Route strict path="/categories/" render={(props) => <CategoryRouter stocks={this.state.productsInCart} />} />
                    <Route path="/categories/:category/:id" render={(props) => <FullProductDescription {...props} changeQuantities={this.changeQuantities} products={this.state.items} productsInCart={this.state.productsInCart} />} />
                    <Route exact strict path='/categories/:category' render={props => <AllProducts changeQuantities={this.changeQuantities}  key={window.location.pathname} products={this.state.items} updateCartItemsCount={this.updateCartItemsCount} />} />

                    <Route path="/Contacts">
                        <Contacts kintamasis="pirmasis" />
                    </Route>
                    <Route path="/cart" component={(props) => <Cart changeQuantities={this.changeQuantities}  addToBasket={this.addToBasket} deleteItem={this.deleteItem} items={this.state.items} productList={this.state.productsInCart} updateCartItemsCount={this.updateCartItemsCount} />} />
                    <div className="footerHoldInPlace">
                        <footer>
                            <div className="footer">
                                <div className="breakAfter">
                                    <p>Sekite mus:</p>
                                    <a tabIndex="0" href="daivagusevaite@gmail.com"><img style={{ width: '30px', marginLeft: '10px' }} src={mailIcon} alt={'Mail Icon'} /></a>
                                    <a tabIndex="0" href="https://www.facebook.com/groups/152164343511570"><img style={{ width: '30px', marginLeft: '10px' }} src={facebook} alt={'Facebook icon'} /></a>
                                    <a tabIndex="0" href="https://www.instagram.com/daivagusevaite/?hl=en"><img style={{ width: '30px', marginLeft: '10px' }} src={instagram} alt={'Instagram icon'} /></a>
                                </div>

                                <div className="footerTop">
                                    <a tabIndex="0" href="#">Vizija</a>
                                    <Link tabIndex="0" to="/">Apie produktus</Link>
                                    <Link tabIndex="0" to="/About">Verslo galimybė</Link>
                                    <a tabIndex="0" href="#">Siuntimas</a>
                                    <Link tabIndex="0" to="/Contacts">Kontaktai</Link>
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
   
    // takeText = () => {
    //     // console.log('pradejo')
    //     fetch('http://localhost:3000/paragraphs')
    //         .then(res => res.json())
    //         .then(data => {
    //             const paragraphs2 = data[0];
    //             console.log(paragraphs2)
    //         })
    // }
    render() {
        const { homePage, homePage2 } = this.props.paragraphs;

        return (
            <div className="homePage">
                <h1>Home</h1>
                <div className="homePageDisplay">
                    <div>
                        <h4>
                            Apie mane
                        </h4>
                        <p>{homePage}</p>
                    </div>
                    <img src={profilePic} alt="Daiva S."></img>
                    <img  src={Aloe} alt="Aloe"></img>
                    <div>
                        <h4>
                            Produktai iš alavijo
                        </h4>
                        <p>{homePage2}</p>
                    </div>
                </div>
                
            </div>
        )
    }

}

export default App;