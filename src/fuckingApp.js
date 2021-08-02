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
import TestingFlickeringProduct from './Components/Products/testingFuckingFlickeringProduct.js';

import OneProductCard from './Components/Products/OneProductCard';
import CategoryRouter from './Components/Products/CategoryRouter.js';
import FullProductDescription from './Components/Products/FullProductDescription.js'
import { render } from '@testing-library/react';
import TestingFlickering from './Components/About/testingFlickering.js';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: '',
            productsInCart: [],
            items: [],
            cartItemCount: 0,
            clicked: 1,
            count: 0
            // productsInCart: []
        }
    }
    // Be sito routas irgi lyg veikia, bet po refresho state su produktais nusinulina ir sauna i if'a :/ nzn kaip bus su krepseliu
    componentWillMount = () => {
        console.log('fuckingApp.js componentDidMount');
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((response) => {
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
                // this.setState({ items: newList, productsInCart: JSON.parse(localStorage.getItem('cartItems')) || []}, () => console.log(this.state.items))
                this.setState({ items: productsFromDB, productsInCart: newList }, () => this.updateCartItemsCount())

            })
        // this.updateCartItemsCount()
    }

    skaiciuok = () => this.setState({ count: this.state.count + 1 });
    

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

    // gettingCartProducts = (props) => {

    //     let fromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
    //     let newList = [];
    //     let globalItemList = this.state.items;

    //     let globalItemListLength = Object.keys(globalItemList).length
    //     if (globalItemListLength > 0) {
    //         fromLocalStorage.forEach(item => {
    //             globalItemList[item.id].quantity = item.quantity
    //             newList.push(globalItemList[item.id]);
    //         })
    //         // this.setState({ productsInCart: newList }, () => this.genericPriceCalculation())
    //         // this.setState({ productsInCart: newList })
          
    //             // const { productsInCart, price } = this.state;
    //             let cost = 0;
    //             newList.forEach(product => {
    //                 cost += product.quantity * product.price
    //             })
    //         this.setState({ price: Math.round(cost * 100) / 100, productsInCart: newList })
            

    //     }
    // }
    // genericPriceCalculation = () => {
    //     const { productsInCart, price } = this.state;
    //     let cost = 0;
    //     productsInCart.forEach(product => {
    //         cost += product.quantity * product.price
    //     })
    //     this.setState({ price: Math.round(cost * 100) / 100 })
    // }

    updateCartItemsCount = () => {
        console.log('isijunge updateCartItemsCount is fuckingApp.js as componentDidMount CallBack function');
        console.log(this.state.items);
        let itemsInsideLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
        
        if (itemsInsideLocalStorage)
            // this.setState({ productsInCart: itemsInsideLocalStorage, cartItemCount: itemsInsideLocalStorage.length })
            this.setState({cartItemCount: itemsInsideLocalStorage.length })

    }

    render() {
        console.log('rerender fuckingApp.js')
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
                                <Link to="/about">Verslo galimybė</Link>
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
                    <img style={{ width: '100px', 'paddingTop': '50px', display: 'block', 'zIndex': '100' }} src={foreverLogo} alt={'Forever Logo'} />
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about/:category/:id" component={(props) => <TestingFlickeringProduct  skaiciuok={this.skaiciuok} count={this.state.count}/>} />
                    <Route path="/about/testingFlickering">
                        <TestingFlickering skaiciuok={this.skaiciuok} count={this.state.count} products={this.state.items} />
                    </Route> 

                    {/* <Route strict exact path="/about/testingFlickering" component={() => <TestingFlickering changeQuantities={this.changeQuantities} skaiciuok={this.skaiciuok} count={this.state.count} products={this.state.items} /> }/> */}

                    <Route exact strict path="/about">
                        <About skaiciuok={this.skaiciuok} count={this.state.count}/>
                    </Route>

                    <Route strict path="/categories/" render={(props) => <CategoryRouter stocks={this.state.productsInCart} />} />
                    {/* <Route path="/categories/:category/:id">
                        <FullProductDescription skaiciuok={this.skaiciuok} changeQuantities={this.changeQuantities} products={this.state.items}/>
                    </Route> */}
                    <Route path="/categories/:category/:id" render={(props) => <FullProductDescription {...props} skaiciuok={this.skaiciuok} changeQuantities={this.changeQuantities} products={this.state.items} productsInCart={this.state.productsInCart} />} />
                    <Route exact strict path='/categories/:category' render={props => <AllProducts changeQuantities={this.changeQuantities}  key={window.location.pathname} products={this.state.items} updateCartItemsCount={this.updateCartItemsCount} />} />

                    <Route path="/Contacts">
                        <Contacts kintamasis="pirmasis" />
                    </Route>
                    <Route path="/Cart" component={(props) => <Cart changeQuantities={this.changeQuantities} skaiciuok={this.skaiciuok} addToBasket={this.addToBasket} deleteItem={this.deleteItem} items={this.state.items} productList={this.state.productsInCart} updateCartItemsCount={this.updateCartItemsCount} />} />
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
                                    <a href="daivagusevaite@gmail.com"><img style={{ width: '30px', marginLeft: '10px' }} src={mailIcon} alt={'Mail Icon'} /></a>
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

        return (
            <div>
                <h1>Home2</h1>
            </div>
        )
    }

}

export default App;