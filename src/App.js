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
            route: ''

        }
    }

    onRouteChange = (newRoute) => {
        this.setState({route: newRoute});  
        // console.log(this.state)
    }

    render() {
        const changePage = () => {
            if (this.state.route === 'About') {
                return <About onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'AllProducts') {
                return <AllProducts onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'Contacts') {
                return <Contacts onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'Cart') {
                return <Cart onRouteChange={this.onRouteChange} />
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
                        <li className='listItem floatRight' onClick={() => this.onRouteChange('Cart')}><img style={{ width: '30px', background: 'transparent' }} src={basketIcon} alt={'basket Icon'} /></li>
                    </ul>
                    <img style={{width:'100px', 'paddingTop': '50px', display:'block'}} src={foreverLogo} alt={'Forever Logo'} />
                </div>
                { changePage() }
            </div>
        )
    }
}

export default App;

