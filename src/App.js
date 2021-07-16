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
import '../src/Components/NavigationBar/NavigationBar.css';
import './App.css';
import basketIcon from './img/basket-icon.png';
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
            items: []
         
        }
    }
    // Be sito routas irgi lyg veikia, bet po refresho state su produktais nusinulina ir sauna i if'a :/ nzn kaip bus su krepseliu
     componentDidMount = () => {
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ items: data.data})
            })
    }
setBoth =()=>{
    this.selectingCategory();
    this.commingFrom();

}
    selectingCategory =()=>{
        this.setState({ selectedCategory: this.props.match.params.category })
    }
    onRouteChange = (newRoute) => {
        this.setState({route: newRoute});  
    }
    
    addToBasket = (newArg, evt) => {
        const {productsInCart} = this.state;
        
        if (!productsInCart.find(product => product.id == newArg.id) ) {
            newArg.quantity = 1;
            productsInCart.push(newArg)
            this.setState({ productsInCart });
        } else if (productsInCart.find(product => product.id == newArg.id && product.quantity < 10) ) {
            let currentQuantity = productsInCart.find(product => product.id == newArg.id).quantity
            productsInCart.find(product => product.id == newArg.id).quantity = currentQuantity + 1;
            this.setState({ productsInCart});
        }
    }
    deleteItem = (singleProduct) => {
        const { productsInCart } = this.state;
        let index = productsInCart.findIndex(product => product.id == singleProduct.id);
        if (index !== -1) {
            productsInCart.splice(index, 1)
        }
        this.setState({ productsInCart })
    }
    commingFrom = () => console.log('App');

    render() {
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
                                        <div className="cartItems"><p className="cartText">{this.state.productsInCart.length}</p></div>
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
                            {/*Just for test if it works or any other reason behinf it. */}
                        {/* <Route path="/categories/biciu_produktai/2">
                            <House   />
                        </Route> */}


                        <Route strict path="/categories/" component={(props) => <CategoryRouter {...props} stocks={this.state.productsInCart} />} />

                    <Route path='/categories/:category' component={(props) => <AllProducts key={window.location.pathname} products={this.state.items} />} />

                       

                         
                        
                            {/*This is old and original way how it ran, in same file */} 
                        {/* <Route path='/categories/:category' component={(props) => <AllProducts {...props} key={window.location.pathname} products={items} />} /> */}
                    
                    {/*This is original prie CategoryRouter as it's not running properly and all routes should be in one place */}
                        {/* <Route path='/categories/:category' component={(props) => <AllProducts onClick={this.setBoth} key={window.location.pathname} products={this.state.items} />} /> */}
                        
                        

                       
                        {/* <Route path='/categories/:category'>
                            <House key={window.location.pathname} products={this.state.items} />
                        </Route> */}
                        
                        
                        <Route path="/Contacts">
                            <Contacts kintamasis="pirmasis" />
                        </Route>
                        <Route path="/Cart">
                            <Cart addToBasket={this.addToBasket} deleteItem={this.deleteItem} productList={this.state.productsInCart} />
                        </Route>


                        {/* <Route path={`${path}/${props.singleProduct.id}`}>
                            <FullProductDescription kebybis={"kebybis"} {...props} />
                        </Route> */}
                        {/* <Route path="/categories" exact>
                            <CategoryRouter />
                        </Route> */}
                        {/* <Route path="/categories/:kategorija" >
                            <AllProducts selectedCategory="bičių produktai" />
                        </Route> */}
                    
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