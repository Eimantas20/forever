import React, { Component } from 'react';
// import './App.css';
import Random from './Components/NavigationBar/NavigationBar.js';
import About from './Components/About/About.js';
import ProductCard from './Components/Products/ProductCard.js';
import Contacts from './Components/Contacts/Contacts';
import foreverLogo from './Infinity.png';
import '../src/Components/NavigationBar/NavigationBar.css'


class App extends Component {
    constructor() {
        super();
        this.state = {
            route: ''
        }
    }

    // componentDidMount = () => {
    //     fetch('https://jsonplaceholder.typicode.com/todos')
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    // }

 



    onRouteChange = (route) => {
        this.setState({route: route});  
        // console.log(this.state)
    }

    render() {
        const middlePage = () => {
            if (this.state.route === 'About') {
                return <About onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'ProductCard') {
                return <ProductCard onRouteChange={this.onRouteChange} />
            } else if (this.state.route === 'Contacts') {
                return <Contacts onRouteChange={this.onRouteChange} />
            }
        }

        return (
            <div className="App">
                <div>
                    <ul className='ulStyle'>
                        <li className='listItem' onClick={() => this.onRouteChange('/')} href="#0">{'Home'}</li>
                        <li className='listItem' onClick={() => this.onRouteChange('About')}>{'About'}</li>
                        <li className='listItem' onClick={() => this.onRouteChange('ProductCard')}>{'Products'}</li>
                        <li className='listItem floatRight' onClick={() => this.onRouteChange('Contacts')}>{'Contacts'}</li>
                    </ul>
                    <img style={{width:'100px', 'paddingTop': '50px', display:'block'}} src={foreverLogo} alt={'Forever Logo'} />
                </div>
                { middlePage() }
            </div>
        )
    }
}

export default App;

