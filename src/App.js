import React, { Component, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from 'react-router-dom';
import './App.css';
import HomePage from './Components/homePage/HomePage.js'
import Random from './Components/NavigationBar/NavigationBar.js';
import BusinessOpportunity from './Components/businessOpportunity/BusinessOpportunity.js';
import AllProducts from './Components/Products/AllProducts.js';
import Contacts from './Components/Contacts/Contacts.js';
import Cart from './Components/Cart/Cart.js';
import About from './Components/about/about.js';
import foreverLogo from './Infinity.png';
import basketIcon from './img/basket-icon.png';
import hamburgerIcon from './img/hamburger_icon.png'
import mailIcon from './img/mail.png';
import facebook from './img/facebook.png';
import instagram from './img/instagram.png';
import Aloe from './img/Aloe.jpg';
import aloe_vera from './img/aloe_vera.jpg';
import profilePic from './img/profilePic.jpg';
import '../src/Components/NavigationBar/NavigationBar.css';
import './App.css';
import Checkout from './Components/Checkout/Checkout.js';
import image_1 from './img/homepage/71fyxuOu-yL._SY606_.jpg';
import image_2 from './img/homepage/pexels-cecília-o-904621.jpg';
import image_3 from './img/homepage/pexels-fabrício-lira-2896162.jpg';
import image_4 from './img/homepage/pexels-yusuf-yulipurnawan-343188.jpg';
import image_5 from './img/homepage/pexels-linda-prebreza-286951.jpg';
import image_6 from './img/homepage/pexels-pixabay-268854.jpg';
import image_7 from './img/homepage/pexels-pixabay-459369.jpg';


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
            paragraphs: '',
            categories: [
                {
                    url: "biciu_produktai",
                    name: "Bičių produktai",
                    img: image_1
                },
                {
                    url: "eteriniai_aliejai",
                    name: "Eteriniai aliejai",
                    img: image_2
                },
                {
                    url: "odos_prieziura",
                    name: "Odos priežiūros",
                    img: image_3
                },
                {
                    url: "svorio_reguliavimas",
                    name: "Svorio reguliavimas",
                    img: image_4
                },
                {
                    url: "maisto_papildai",
                    name: "Maisto papildai",
                    img: image_5
                },
                {
                    url: "gerimai",
                    name: "Gėrimai",
                    img: image_6
                },
                {
                    url: "higienos_priemones",
                    name: "Higienos priemonės",
                    img: image_7
                }
            ]
           
        }
    }
    componentDidMount = () => {
        // fetch('http://localhost:3000/products')
        fetch('http://localhost:3000/products')

            .then((response) => response.json())
            .then((response) => {
                // const paragraphs = response.text[0];
                console.log(response.text)
                const NX = response.data
                let productsFromDB = {};
                let newList = [];
                response.data.forEach(item => {
                    item.price = (item.price / 100).toFixed(2);
                    productsFromDB[item.id] = item;
                    

                })
                // console.log(productsFromDB)
                let localStorageProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
                // localStorageProducts.forEach(item => {
                    // productsFromDB[item.id].quantity = item.quantity
                    // newList.push(productsFromDB[item.id]);
                // })
                // console.log(newList)
                // console.log(productsFromDB)
                this.setState({ items: productsFromDB, productsInCart: newList, paragraphs: response.text[0] }, () => this.updateCartItemsCount())
            })        
    }

    
    changeQuantities = (singleProduct, number) => {
        let flavor;
        if (document.getElementById('flavors')) {
             flavor = document.getElementById('flavors').value
        }
        let localStorageProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
        let newList = [];
        let globalItemList = this.state.items;
        let globalItemListLength = Object.keys(globalItemList).length;
        let cost = 0;

        console.log('pataike i changeQuantities funkcija')
        console.log(singleProduct)

        if (number == 1) {
            console.log(localStorageProducts.find(product => product.id == singleProduct.id))

            if (localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity < 10 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null))) {
                let currentQuantity = localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity < 10 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity;
                console.log(currentQuantity)

                localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity < 10 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity = currentQuantity + 1
            } else { this.changeQuantities(singleProduct, 100)}

        } else if (number == -1) {
            console.log('atejo i -1')
            console.log(localStorageProducts)
            // console.log(singleProduct)

            // console.log(localStorageProducts.find((product) => product.id == singleProduct.id && (product.desiredFlavor == singleProduct.desiredFlavor || product.desiredFlavor == flavor || product.desiredFlavor == 'none') && product.quantity > 1))
            console.log(localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity > 1 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)))


            if (localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity > 1 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null))) {
                // console.log('bet cia jau neatejo')
                let currentQuantity = localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity > 1 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity;
                localStorageProducts.find((product) => product.id == singleProduct.id && product.quantity > 1 && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)).quantity = currentQuantity - 1
            }



        } else if (number == -100) {
            if (localStorageProducts.findIndex((product) => product.id == singleProduct.id && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)) > -1) {
                localStorageProducts.splice(localStorageProducts.findIndex(product => product.id == singleProduct.id && product.desiredFlavor == (singleProduct.desiredFlavor || flavor || null)), 1)
                // console.log(localStorageProducts)
            }

        } else if (number == 100) {
            // console.log('atejo')
            // console.log(singleProduct.id)
            // console.log(localStorageProducts.findIndex(product => product.id === singleProduct.id))
            let newItem = {
                'id': singleProduct.id,
                'quantity': 1,
                'desiredFlavor': flavor || null,
            };
            localStorageProducts.push(newItem);

            // if (!localStorageProducts.find(product => product.id == singleProduct.id)) {
            //     let newItem = {
            //         'id': singleProduct.id,
            //         'quantity': 1,
            //         'desiredFlavor': flavor,
            //     };
            //     localStorageProducts.push(newItem);

            // } else if (localStorageProducts.find(product => product.id == singleProduct.id && product.quantity < 10)) {
            //     let currentQuantity = localStorageProducts.find(product => product.id == singleProduct.id).quantity;
            //     localStorageProducts.find(product => product.id == singleProduct.id).quantity = currentQuantity + 1
            // }
        }

        if (globalItemListLength > 0) {
           
            //reik idet catcha jei nesufaidina ID nes kitaip objekta visvien ipushina i newList ir paskui bybis veikia
            localStorageProducts.forEach(item => {
                globalItemList[item.id].quantity = item.quantity
                newList.push(globalItemList[item.id]);
            })
   
            newList.forEach(product => {
                cost += product.quantity * product.price
            })
            
        }
        if (localStorageProducts) 
            localStorage.setItem('cartItems', JSON.stringify(localStorageProducts))
            this.setState({ price: Math.round(cost * 100) / 100, productsInCart: newList, itemsInsideBasket: JSON.stringify(localStorageProducts), cartItemCount: localStorageProducts.length  })
    }

    updateCartItemsCount = () => {
        // console.log(this.state.productsInCart)
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
                            <Link onClick={() => this.openMenu()} to="/contacts"><li className='listItem floatRight'>Kontaktai </li></Link>
                            <Link onClick={() => this.openMenuForCart()} tabIndex="0"  to="/cart">
                                <li className='listItem floatRight deleteItem={this.deleteItem}'>
                                    <div style={{position: "relative", width: "40px", margin: "0 auto"}}>
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
                        <HomePage categories={this.state.categories} />
                    </Route>
                    <Route path="/about" exact>
                        <About paragraphs={this.state.paragraphs}/>
                    </Route>
                    <Route exact strict path="/businessOpportunity">
                        <BusinessOpportunity paragraphs={this.state.paragraphs} />
                    </Route>
                    <Route path="/checkout" render={(props) => <Checkout />}/>
                    <Route strict path="/categories/" render={(props) => <CategoryRouter categories={this.state.categories} stocks={this.state.productsInCart} />} />
                    <Route path="/categories/:category/:id" render={(props) => <FullProductDescription {...props} changeQuantities={this.changeQuantities} products={this.state.items} productsInCart={this.state.productsInCart} />} />
                    <Route exact strict path='/categories/:category' render={props => <AllProducts changeQuantities={this.changeQuantities}  key={window.location.pathname} products={this.state.items} updateCartItemsCount={this.updateCartItemsCount} />} />

                    <Route path="/contacts">
                        <Contacts kintamasis="pirmasis" />
                    </Route>
                    <Route path="/cart" component={(props) => <Cart changeQuantities={this.changeQuantities}  addToBasket={this.addToBasket} deleteItem={this.deleteItem} items={this.state.items} updateCartItemsCount={this.updateCartItemsCount} />} />
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
                                    {/* <a tabIndex="0" href="#">Vizija</a> */}
                                    <Link tabIndex="0" to="/about">Apie įmone</Link>
                                    <Link tabIndex="0" to="/categories/">Apie produktus</Link>
                                    <Link tabIndex="0" to="/businessOpportunity">Verslo galimybė</Link>
                                    {/* <Link tabIndex="0" to="/about">Verslo galimybė</Link> */}

                                    <a tabIndex="0" href="#">Siuntimas</a>
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

{/* <div className="homePageDisplay">
    <div>
        <h4>
            Apie mane
        </h4>
        <p>{homePage}</p>
    </div>
    <img src={profilePic} alt="Daiva S."></img>
    <img src={Aloe} alt="Aloe"></img>
    <div>
        <h4>
            Produktai iš alavijo
        </h4>
        <p>{homePage2}</p>
    </div>
</div> */}