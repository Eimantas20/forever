import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './app.css';
import HomePage from '../HomePage/homePage.js';
import BusinessOpportunity from '../BusinessOpportunity/businessOpportunity.js';
import AllProducts from '../Products/allProducts.js';
import Contacts from '../Contacts/contacts.js';
import Cart from '../Cart/cart.js';
import About from '../About/about.js';
// import foreverLogo from './img/Infinity.png';
import basketIcon from '../../Img/basket_icon.png';
import hamburgerIcon from '../../Img/hamburger_icon.png'
import mailIcon from '../../Img/mail.png';
import facebook from '../../Img/facebook.png';
import instagram from '../../Img/instagram.png';
// import './Components/CategoryRouter/NavigationBar.css';
import Checkout from '../Cart/Checkout/checkout.js';
import image_1 from '../../Img/Homepage/drink.jpg';
import image_2 from '../../Img/Homepage/aloe_flower.jpg';
import image_3 from '../../Img/Homepage/dancing.jpg';
import image_4 from '../../Img/Homepage/aloe_leaf3.jpg';
import image_5 from '../../Img/Homepage/skin_care.jpg';
import image_6 from '../../Img/Homepage/aloe_leaf.jpg';
import image_7 from '../../Img/Homepage/aloe_leaf2.jpg';
import CategoryRouter from '../CategoryRouter/categoryRouter.js';
import FullProductDescription from '../Products/FullProductDescription/fullProductDescription.js';
import AboutProducts from '../AboutProducts/aboutProducts.js';

const addProduct = 100;
const increaseQuantity = 1;
const decreaseQuantity = -1;
const deleteProduct = -100;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productsInCart: [],
            productsList: [],
            cartItemCount: 0,
            paragraphs: '',
            categories: [
                {
                    url: "biciu_produktai",
                    name: "Bičių produktai",
                    img: image_1,
                    key: 'ca'
                },
                {
                    url: "eteriniai_aliejai",
                    name: "Eteriniai aliejai",
                    img: image_2,
                    key: 'cb'
                },
                {
                    url: "odos_prieziura",
                    name: "Odos priežiūros",
                    img: image_3,
                    key: 'cc'
                },
                {
                    url: "svorio_reguliavimas",
                    name: "Svorio reguliavimas",
                    img: image_4,
                    key: 'cd'
                },
                {
                    url: "maisto_papildai",
                    name: "Maisto papildai",
                    img: image_5,
                    key: 'ce'
                },
                {
                    url: "gerimai",
                    name: "Gėrimai",
                    img: image_6,
                    key: 'cf'
                },
                {
                    url: "higienos_priemones",
                    name: "Higienos priemonės",
                    img: image_7,
                    key: 'cg'
                }
            ]
        }
    }

    componentDidMount = () => {
        let itemsInsideLocalStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
        // fetch('http://localhost:3000/products')
        fetch('http://192.168.1.231:3000/products')
            .then((response) => response.json())
            .then((response) => {
                let productsFromDB = {};
                //converting price cents to euros
                response.products.forEach(item => {
                    item.price = (item.price / 100).toFixed(2);
                    productsFromDB[item.id] = item;
                })
                this.setState({ productsList: productsFromDB, paragraphs: response.text[0], cartItemCount: itemsInsideLocalStorage.length})
            })        
    }

    changeQuantities = (singleProduct, number) => {
        let flavor;
        if (document.getElementById('flavors')) {
            flavor = document.getElementById('flavors').value
        }
        let localStorageProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
        let newProductsList = [];

        switch(number) {
            case increaseQuantity:
                let increaseQuantityCondition = localStorageProducts.find((product) => product.id === singleProduct.id && product.quantity < 10 && product.desiredFlavor === (singleProduct.desiredFlavor || flavor || null));
                if (increaseQuantityCondition) {
                    let currentQuantity = increaseQuantityCondition.quantity;
                    increaseQuantityCondition.quantity = currentQuantity + 1
                } 
            break

            case decreaseQuantity:
                let decreaseQuantityCondition = localStorageProducts.find((product) => product.id === singleProduct.id && product.quantity > 1 && product.desiredFlavor === (singleProduct.desiredFlavor || flavor || null));
                if (decreaseQuantityCondition) {
                    let currentQuantity = decreaseQuantityCondition.quantity;
                    decreaseQuantityCondition.quantity = currentQuantity - 1
                }
            break

            case deleteProduct:
                let deleteProductCondition = localStorageProducts.findIndex((product) => product.id === singleProduct.id && product.desiredFlavor === (singleProduct.desiredFlavor || flavor || null));
                if (deleteProductCondition> -1) {
                    localStorageProducts.splice(deleteProductCondition, 1)
                }
            break
            
            case addProduct:
                let addedProduct = {
                    'id': singleProduct.id,
                    'quantity': 1,
                    'desiredFlavor': flavor || null,
                };
                localStorageProducts.push(addedProduct);
                break;
                //no default
        }

        if (localStorageProducts) localStorage.setItem('cartItems', JSON.stringify(localStorageProducts));

        this.setState({productsInCart: newProductsList, itemsInsideBasket: JSON.stringify(localStorageProducts), cartItemCount: localStorageProducts.length  })
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
                            <Link onClick={() => this.openMenu()} to="/"><li className='listItem' key="navA">Pradžia</li></Link>
                            <Link onClick={() => this.openMenu()} to="/businessOpportunity"><li className='listItem' key="navB">Verslo galimybė</li></Link>
                            <Link onClick={() => this.openMenu()} to="/categories/"><li className='listItem' key="navC">Produktai</li></Link>
                            <Link onClick={() => this.openMenu()} to="/contacts"><li className='listItem floatRight' key="navD">Kontaktai </li></Link>
                            <Link onClick={() => this.openMenuForCart()} tabIndex="0"  to="/cart">
                                <li className='listItem floatRight'>
                                    <div className="cartContainer" key="navE">
                                        <div className="cartItems"><p className="cartText">{this.state.cartItemCount}</p></div>
                                        <img className="basketIcon" src={basketIcon} alt={'Cart Icon'} />
                                    </div>
                                </li> 
                            </Link>
                            <li className="icon" key="navF">
                                <img onClick={() => this.openMenu()} className="hamburgerIcon" src={hamburgerIcon} alt={'Menu img'} />
                            </li>
                        </ul>
                    </nav>
                    <Link to="/">
                        <h1 className="projectName" key="navG">Alavijo Produktai</h1>
                    </Link>
                    {/* <img className="logoStyle" src={foreverLogo} alt={'Forever Logo'} /> */}
                    <Route path="/" exact>
                        <HomePage categories={this.state.categories} />
                    </Route>
                    <Route path="/about" exact>
                        <About paragraphs={this.state.paragraphs}/>
                    </Route>
                    <Route path="/aboutProducts" render={(props) => <AboutProducts {...props} />} />

                    <Route exact strict path="/businessOpportunity">
                        <BusinessOpportunity paragraphs={this.state.paragraphs} />
                    </Route>
                    <Route path="/checkout" render={(props) => <Checkout />}/>
                    <Route strict path="/categories/" render={(props) => <CategoryRouter categories={this.state.categories} stocks={this.state.productsInCart}/>} />
                    <Route strict exact path="/categories/" render={(props) => <AboutProducts {...props}/>} />
                    <Route path="/categories/:category/:id" render={(props) => <FullProductDescription {...props} changeQuantities={this.changeQuantities} products={this.state.productsList} productsInCart={this.state.productsInCart} />} />
                    <Route exact strict path='/categories/:category' component={(props) => <AllProducts changeQuantities={this.changeQuantities} key={window.location.pathname} products={this.state.productsList} productsList={this.state.productsList} />} />
                    <Route path="/contacts">
                        {/* Will be changed in near future, as no data been presented */}
                        <Contacts />
                    </Route>
                    <Route path="/cart" component={(props) => <Cart changeQuantities={this.changeQuantities} productsList={this.state.productsList} />} />
                    <div className="footerHoldInPlace">
                        <footer>
                            <div className="footer">
                                <div className="breakAfter">
                                    <p>Sekite mus:</p>
                                    <a tabIndex="0" href="daivagusevaite@gmail.com"><img className="footerSocialNetwork" src={mailIcon} alt={'Mail Icon'} /></a>
                                    <a tabIndex="0" href="https://www.facebook.com/groups/152164343511570"><img className="footerSocialNetwork" src={facebook} alt={'Facebook icon'} /></a>
                                    <a tabIndex="0" href="https://www.instagram.com/daivagusevaite/?hl=en"><img className="footerSocialNetwork" src={instagram} alt={'Instagram icon'} /></a>
                                </div>
                                <div className="footerBottom">
                                    <Link tabIndex="0" to="/about">Apie įmone</Link>
                                    {/* -----------------Link will be changed once aboutProducts section shall be done------------ */}
                                    <Link tabIndex="0" to="/aboutProducts">Apie produktus</Link>
                               
                                    <Link tabIndex="0" to="/businessOpportunity">Verslo galimybė</Link>
                                    <Link tabIndex="0" to="/delivery">Siuntimas</Link>
                                    <Link tabIndex="0" to="/contacts">Kontaktai</Link>
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

export default App;


// changeQuantities = (singleProduct, number) => {
//     let flavor;
//     if (document.getElementById('flavors')) {
//         flavor = document.getElementById('flavors').value
//     }
//     let localStorageProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
//     let newProductsList = [];
//     let globalItemList = this.state.productsList;
//     let globalItemListLength = Object.keys(globalItemList).length;
//     let cost = 0;
//     if (number == 1) {
//         if (localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity < 10 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null))) {
//             let currentQuantity = localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity < 10 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity;
//             localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity < 10 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity = currentQuantity + 1
//         } else {
//             this.changeQuantities(singleProduct, 100)
//         }

//     } else if (number == -1) {
//         if (localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity > 1 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null))) {
//             let currentQuantity = localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity > 1 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity;
//             localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity > 1 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity = currentQuantity - 1
//         }

//     } else if (number == -100) {
//         if (localStorageProducts.findIndex((product) => product.id == singleProduct.id && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)) > -1) {
//             localStorageProducts.splice(localStorageProducts.findIndex(product => product.id == singleProduct.id && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)), 1)
//         }

//     } else if (number == 100) {

//         let addedProduct = {
//             'id': singleProduct.id,
//             'quantity': 1,
//             'desiredFlavor': flavor || null,
//         };
//         localStorageProducts.push(addedProduct);
//     }

//     if (globalItemListLength > 0) {
//         localStorageProducts.forEach(item => {
//             globalItemList[item.id].quantity = item.quantity
//             newProductsList.push(globalItemList[item.id]);
//         })
//         newProductsList.forEach(product => {
//             cost += product.quantity * product.price
//         })

//     }
//     if (localStorageProducts)
//         localStorage.setItem('cartItems', JSON.stringify(localStorageProducts))
//     this.setState({ price: Math.round(cost * 100) / 100, productsInCart: newProductsList, itemsInsideBasket: JSON.stringify(localStorageProducts), cartItemCount: localStorageProducts.length })
// }