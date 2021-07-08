import React, { Component } from 'react';
import './App.css';
import Random from './Components/NavigationBar/NavigationBar.js';
import About from './Components/About/About.js';
import AllProducts from './Components/Products/AllProducts.js';
import Contacts from './Components/Contacts/Contacts.js';
import Cart from './Components/Cart/Cart.js';
import foreverLogo from './Infinity.png';
import '../src/Components/NavigationBar/NavigationBar.css';
import './App.css';
import basketIcon from './img/basket-icon.png';

class App extends Component {
    constructor() {
        super();
        this.state = {
            route: '',
            productsInCart: []
         
        }
    }

    onRouteChange = (newRoute) => {
        this.setState({route: newRoute});  
    }
    
    addToBasket = (newArg, evt) => {
        const {productsInCart} = this.state;
        let newArg2 = JSON.parse(JSON.stringify(newArg))
        if (!productsInCart.find(product => product.id == newArg2.id) ) {
            newArg2.quantity = 1;
            productsInCart.push(newArg2)
            this.setState({ productsInCart });
        } else if (productsInCart.find(product => product.id == newArg2.id && product.quantity < 10) ) {
            let currentQuantity = productsInCart.find(product => product.id == newArg2.id).quantity
            productsInCart.find(product => product.id == newArg2.id).quantity = currentQuantity + 1;
            this.setState({ productsInCart});
        }
    }
    deleteItem = (singleProduct) => {
        const { productsInCart } = this.state;
        let index = productsInCart.findIndex(product => product.id == singleProduct.id);
        if (index !== -1) {
            productsInCart.splice(index, 1)
        }
        this.setState({ productsInCart }, () => this.test())
    }

    test = () => {console.log(this.state.productsInCart)}

    render() {
        const changePage = () => {
            if (this.state.route === 'About') {
                return <About onRouteChange={this.onRouteChange}/>
            } else if (this.state.route === 'AllProducts') {
                return <AllProducts onRouteChange={this.onRouteChange} addToBasket={this.addToBasket}/>
            } else if (this.state.route === 'Contacts') {
                return <Contacts onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'Cart') {
                if(this.state.productsInCart.length == 0 ) {
                    return <h2>Jūsų pirkinių krepšelis yra tuščias</h2>
                } else {
                    return <Cart onRouteChange={this.onRouteChange} addToBasket={this.addToBasket} deleteItem={this.deleteItem} productList={this.state.productsInCart} />

                }
            }
        }
        return (
            <div className="App">
                <div>
                    <ul className='ulStyle'>
                        <li className='listItem' onClick={() => this.onRouteChange('/')} href="#0">{'Pradžia'}</li>
                        <li className='listItem' onClick={() => this.onRouteChange('About')}>{'Verslo galimybė'}</li>
                        <li className='listItem' onClick={() => this.onRouteChange('AllProducts')}>{'Produktai'}</li>
                        <li className='listItem floatRight' onClick={() => this.onRouteChange('Contacts')}>{'Kontaktai'}</li>
                        <li className='listItem floatRight' deleteItem={this.deleteItem} onClick={() => this.onRouteChange('Cart')}>
                            <div>
                                <div className="cartItems"><p className="cartText">{this.state.productsInCart.length}</p></div>
                                <img style={{ width: '30px', background: 'transparent'}} src={basketIcon} alt={'Cart Icon'} />
                            </div>
                        </li>
                    </ul>
                    
                    <img style={{width:'100px', 'paddingTop': '50px', display:'block', 'zIndex':'100'}} src={foreverLogo} alt={'Forever Logo'} />
                </div>
                { changePage() }
            </div>
        )
    }
}

export default App;