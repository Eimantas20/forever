import React, { Component } from 'react';
// import './App.css';
import Random from './Components/NavigationBar/NavigationBar.js';
import About from './Components/About/About.js';
import Products from './Components/Products/Products.js';
import Contacts from './Components/Contacts/Contacts';
import foreverLogo from './Infinity.png';


class App extends Component {
    constructor() {
        super();
        this.state = {
            route: ''
        }
    }

    onRouteChange = (route) => {
        this.setState({route: route});  
        console.log(this.state.route)
    }

    render() {
        const middlePage = () => {
            if (this.state.route === 'About') {
                return <About onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'Products') {
                return <Products onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'Contacts') {
                return <Contacts onRouteChange={this.onRouteChange} />
            }
        }

        return (
            <div className="App">
                <div>
                    <ul className='ulStyle'>
                        <li onClick={() => this.onRouteChange('/')} href="#0">{'Home'}</li>
                        <li onClick={() => this.onRouteChange('About')}>{'About'}</li>
                        <li onClick={() => this.onRouteChange('Products')}>{'Products'}</li>
                        <li onClick={() => this.onRouteChange('Contacts')} className='floatRight'>{'Contacts'}</li>
                    </ul>
                    <img className='logoSize' style={{width:'80px'}} src={foreverLogo} alt={'Forever Logo'} />
                </div>
                { middlePage() }
            </div>
        )
    }
}

export default App;

