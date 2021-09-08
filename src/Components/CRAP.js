const NavigationBar = () => {
    return (
        <ul className='ulStyle'>
            <li onClick={()=>this.props.onRouteChange('/')} href="#0">{'Home'}</li>
            <li onClick={()=>this.props.onRouteChange('/About')}>{'About'}</li>
            <li onClick={()=>this.props.onRouteChange('/Products')}>{'Products'}</li>
            <li onClick={()=>this.prpps.onRouteChange('/Contacts')} className='floatRight'>{'Contacts'}</li>
        </ul>
    )
}};



from app
{/* </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        > 
          Learn React
        </a>
      </header>
    </div> */}



create-react-dom
<div>
    <h2>{`Current route is: ${'five'}`}</h2>
    <ul>
        <li>
            <link to='/'>{'Home'}</link>
        </li>
        <li>
            <link to='/About'>{'About'}</link>
        </li>
        <li>
            <link to='/Products'>{'Products'}</link>
        </li>
        <li>
            <link to='/Contacts'>{'Contacts'}</link>
        </li>
    </ul>
</div>


{
    this.state.route === 'About'
        ? <About onRouteChange={this.onRouteChange} />
        : <Products />
}



{
    (() => {
        switch (this.state.route) {
            case 'About':
                <About onRouteChange={this.onRouteChange} />
                break;
            case 'Products':
                <Products onRouteChange={this.onRouteChange} />
                break;
            default:
                <p>{'5665456448454546548454564984'}</p>;
        }
    })
}

// senas product card--------------------------------------------------------------------------
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './ProductCard.css';

class ProductCard extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }
    // constructor() {
    //     super();
    //     this.state = {
    //         products: {
    //             id: this.state.products.id,
    //             name: '',
    //             category: '',
    //             price: '',
    //             description: ''
    //         }
    //     }
    // }


    componentDidMount = () => {
        fetch('http://localhost:3000')
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => { this.setState({ products: data }) })
    }
    // viewDetails = (data) => {
    //         return console.log(data)
    //     }

    render() {
        const { products } = this.state;
        return (
            <div className='productBox'>
                <img className="imgSize" alt="Product" width="270px" src="https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/04/GettyImages-696251125_header-1024x575.jpg?w=1155&h=1528"></img>
                <p>dfgdfg</p>
                <ul style={{ color: "red" }}>
                    {products.map((product) => {
                        //isimeta du itemai bet ju nematyt kol neuzhoverini!!!! Ziuret ir tvarkyt kas per....
                        console.log(product.name)
                        return <li key={product.id}>{product.name}</li>
                    }
                    )}
                </ul>

                <p>Product price</p>
                <br />
                <p>Product description</p>
            </div>
        )
    }
}

export default ProductCard;



 {() => {
                    let i = 0; 
                    for (i = 0; i <= pages; i++) {
                        <div>
                            console.log{i}
                            <h1>hello</h1>
                            <p>{i}</p>{/*page number*/}
                        </div >
                }return (<div>wtf</div>)} } 




createPage = () => {
    const rows = [];
    for (let i = 1; i <= this.state.pages; i++) {
        rows.push(<ObjectPage data={i} />)
    }
    return rows;
}

{ this.createPage() }



{
    products.map((product) => {
        return (
            <div className="productBox">
                id={product.id}
                <h1>{product.name}</h1>
                <h3>{product.description}</h3>
            </div>
        )
    })
}


{ currentProducts.map(singleProduct => <OneProductCard key={singleProduct.cca3} singleProduct={singleProduct} />) }


{ currentProducts.filter(notFilteredProduct => { notFilteredProduct.name === 'pirminis' }).map(filteredCard => <OneProductCard key={filteredCard.cca3} singleProduct={filteredCard} />) }


selectCategory = () => {
    const { currentProducts, category } = this.state;
    let categorisedProducts = (currentProducts) => currentProducts
        .filter(filteringProduct => filteringProduct.name === 'pirminis')
        .map(filteringProduct => filteringProduct));
// let categorisedProducts = currentProducts.filter(obj => {
//     return obj.name === 'pirminis'
// })
console.log(categorisedProducts(currentProducts))
    }


this.state = { prop: 0 };
this.setState((state) => ({ prop: state.prop + 1 }));



let products = [
    {
        a: "pirmas",
        b: "labas",
        c: 46356
    },{
        a: "antras",
        b: "fsdfds",
        c: 465456
    }, {
        a: "trecias",
        b: "labas",
        c: 46424256
    }, {
        a: "ketvirtas",
        b: "sdfsdf",
        c: 460056
    }, {
        a: "penktas",
        b: "labas",
        c: 46562456
    }, {
        a: "sestas",
        b: "labas",
        c: 46245356
    }
]



const filter = products.filter(product => product.category === "labas");


{/* <div>
                    {selectedProducts === '' ? (
                        <div>{currentProducts.map(singleProduct => <OneProductCard key={singleProduct.cca3} singleProduct={singleProduct} />)}</div>
                    ) : (
                        <div>{selectedProducts.map(singleProduct => <OneProductCard key={singleProduct.cca3} singleProduct={singleProduct} />)}</div>
                    )}
                </div> */}

{/* {if (selectedProducts === '') {
                    currentProducts.map(singleProduct => <OneProductCard key={singleProduct.cca3} singleProduct={singleProduct} />)
                }} */}


{/* {currentProducts.filter(notFilteredProduct => { return notFilteredProduct.Name === 'pirminis' }).map(filteredCard => <OneProductCard key={filteredCard.cca3} singleProduct={filteredCard} />)} */ }
{/* {console.log(currentProducts.filter(notFilteredProduct => { return (()=>notFilteredProduct.Name === 'pirminis' ) }))} */ }
{/* {console.log(currentProducts)} */ }
{/* {console.log(currentProducts[0] ? currentProducts[0].name : 'fuck')} */ }
{/* {console.log(currentProducts.name)} */ }
{/* PAGINATION */ }



addToBasket = (newArg) => {
    let productsInCart2 = this.state.productsInCart;
    let newArg2 = JSON.parse(JSON.stringify(newArg))
    if (productsInCart2.length == 0) {
        newArg2.quantity = 1;
        // productsInCart.push(newArg2);
        productsInCart2.push(newArg2)
        this.setState({ productsInCart: productsInCart2 }, () => this.logIt())
    } else {
        if (productsInCart2.find(({ id }) => id === newArg2.id)) {
            this.setState(prevState => {
                let oldList = Object.assign({}, prevState.quantity);
                oldList.quantity = oldList.quantity + 1;
                return { oldList }
            })
            // let foundOne = productsInCart2.find(({ id }) => id === newArg2.id)
            // foundOne.quantity++
            // this.setState({ productsInCart: foundOne }, () => this.logIt())
        }


        newArg2.quantity++;
        // console.log(newArg2)
        this.setState({ productsInCart: productsInCart2 }, () => { this.logIt() })
    }
}]





{
    (url + "/" + props.singleProduct.id) !== url ?
    <div className="productBox">
        <div>
            <div>
                <Link to={`${url}/${props.singleProduct.id}`}>
                    <button>asjdnas</button>
                    {/* <img onClick={() => props.changeViewButton(props.singleProduct)} className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" /> */}
                    {/* <img className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" /> */}

                </Link>
                <h1 style={{ fontSize: "2rem" }}>{props.singleProduct.name}</h1>
                <h3 style={{ fontSize: "1rem" }}>{props.singleProduct.description}</h3>
                <p style={{ margin: "0.2rem" }}>€ {props.singleProduct.price}</p>
                <button className="orderButton" style={{ backgroundColor: bgColor }} onClick={() => joined(props)}>Užsakyti</button>
            </div>
        </div>
    </div>
    : null
}



const fetchItems = async () => {
    fetch('http://localhost:3000/products')
        .then((response) => response.json())
        .then((response) => {
            let newList = {};

            response.data.forEach(item => {
                newList[item.id] = item;
            })

            setItems(newList)
        })
}



---------------------------------------------------------------

import React, { useEffect, useState, useRef, useReducer } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
//Initial state for reducer
// const initialStates = { viewingProduct: {}, viewingProductQuantity: 0 };


// const reducer = (initialStates, action) => {
//     console.log('TRIGERED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
//     console.log(initialStates, action)
//     let initialStatesProducts = initialStates.viewingProduct;
//     if (action.type == 'work') {
//         // return { count: state.count + 1 };
//         return { initialStatesProducts: action.myProduct}


//             // initialStates.viewingProductQuantity: action.kiekis
//         // } 


//     }
// }


function FullProductDescription(props) {
    // const [state, dispatch] = useReducer(reducer, initialStates)


    let { url, match } = useRouteMatch();
    // const [ myProduct, kiekis] = useReducer(reducer, { viewingProduct: {}, viewingProductQuantity: 0});
    const [viewingProduct, setProduct] = useState({});
    const [viewingProductQuantity, viewProductQuantity] = useState(0);
    let allProductsFromDB = Object.values(props.products);
    let choosenProductId = parseInt(props.match.params.id);

    useEffect(() => {
        console.log('mounted');
        callMe()
        return () => {
            console.log('unmounted')
        }
    })

    const callMe = (props) => {
        console.log('1')
        let productsLength = Object.keys(allProductsFromDB).length;
        if (productsLength > 0) {
            let productsInCartFromLocalStorage = props.productsInCart;
            let kiekis = 0;
            if (productsInCartFromLocalStorage.find(product => product.id == choosenProductId)) {
                kiekis = productsInCartFromLocalStorage.find(product => product.id == choosenProductId).quantity;
            }
            let myProduct = allProductsFromDB.find(product => product.id == choosenProductId)
            // dispatch({ type: 'work', kiekis, myProduct})
            viewProductQuantity(kiekis);
            setProduct(myProduct);
            // function reducer(viewingProductNQuantity) {
            //     return ({ viewingProduct: myProduct, viewingProductQuantity: kiekis });

            // }
        }
    }




    console.log('rerender fullProductDescription')
    // console.log(initialStates)
    // console.log(viewingProduct)
    // const { viewingProduct, viewingProductQuantity } = viewingProductNQuantity;
    return (
        <div className="fullDescription">
            <div className="gridLayout">
                <div>
                    <img className="fullDescriptionImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture" />
                </div>
                <div className="mainProductInfo">
                    {/* <h1>{initialStates.viewingProduct.name}</h1> */}

                    <h1>{viewingProduct.name}</h1>
                    <h2>{viewingProduct.id}</h2>
                    <h3>{viewingProduct.category}</h3>
                    <h3>€ {viewingProduct.price}</h3>
                    <h3>{viewingProduct.description}</h3>
                    <div className="smallerGap">
                        <p>Kiekis</p>
                        <p>porciju skaicius</p>
                    </div>
                    <div>
                        {viewingProductQuantity == 0 ?
                            <button className="orderbutton" onClick={() => props.changeQuantities(viewingProduct, 100)}>Į krepšelį</button>
                            : <div>
                                <p style={{ display: "inline-block" }}>Kiekis</p>
                                <button className="incDec, orderbutton" onClick={() => props.changeQuantities(viewingProduct, -1)}>-</button>
                                {viewingProductQuantity}
                                <button className="incDec, orderbutton" onClick={() => props.changeQuantities(viewingProduct, +1)}>+</button><br />
                                <button className="deleteProduct, orderbutton" onClick={() => props.changeQuantities(viewingProduct, -100)}>Pašalinti prekę</button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    )

}

export default FullProductDescription;



import * as React from "react";

export default class Parent extends React.Component {
    state = {
        name: "Thor",
        home: "Asgard",
        count: 0
    };

    skaiciuok = () => this.setState({ count: this.state.count + 1 });

    render() {
        return (
            <div>
                <p>
                    Change Parent State - <br />
                    Name:{" "}
                    <input
                        type={"text"}
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <br />
                    home:{" "}
                    <input
                        type={"text"}
                        value={this.state.home}
                        onChange={(e) => this.setState({ home: e.target.value })}
                    />
                </p>
                <Child
                    parentState={this.state}
                    skaiciuok={this.skaiciuok}
                    count={this.state.count}
                />
            </div>
        );
    }
}

class Child extends React.Component {
    state = {
        brother: "Loki",
        job: "Being Awesome",
        skaicius: 0
    };

    skaiciuok = () => this.setState({ skaicius: this.state.skaicius + 1 });

    render() {
        return (
            <div>
                <p>
                    Change Child State - <br />
                    Brother:{" "}
                    <input
                        type={"text"}
                        value={this.state.brother}
                        onChange={(e) => this.setState({ brother: e.target.value })}
                    />
                    <br />
                    Job:{" "}
                    <input
                        type={"text"}
                        value={this.state.job}
                        onChange={(e) => this.setState({ job: e.target.value })}
                    />
                </p>
                <p>
                    (Parent State Passed to Child) <br />
                    Name: {this.props.parentState.name} <br />
                    Home: {this.props.parentState.home}
                </p>
                <p>
                    (Child State) <br />
                    Brother: {this.state.brother} <br />
                    Job: {this.state.job}
                    <button onClick={this.props.skaiciuok}>parent counte</button><br />
                    <p>{this.props.count}</p>
                    <button onClick={this.skaiciuok}>child counte</button><br />
                    <p>{this.state.skaicius}</p>
                </p>
            </div>
        );
    }
}

==============================================================
import * as React from "react";
import {useState} from 'react';

export default class Parent extends React.Component {
  state = {
    name: "Thor",
    home: "Asgard",
    count: 0
  };

  skaiciuok = () => this.setState({ count: this.state.count + 1 });

  render() {
    return (
      <div>
        <p>
          Change Parent State - <br />
          Name:{" "}
          <input
            type={"text"}
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
          <br />
          home:{" "}
          <input
            type={"text"}
            value={this.state.home}
            onChange={(e) => this.setState({ home: e.target.value })}
          />
        </p>
        <Child
          parentState={this.state}
          skaiciuok={this.skaiciuok}
          count={this.state.count}
        />
      </div>
    );
  }
}
function Child(props) {
    const [brother, setName] = useState("Loki");
    const [job, setJob] = useState("Being Awesome");
    const [number, setNumber] = useState(0)

  const skaiciuok = () => setNumber(number + 1 );


    return (
      <div>
        <p>
          Change Child State - <br />
          Brother:{" "}
          <input
            type={"text"}
            value={brother}
            onChange={(e) => setName({ brother: e.target.value })}
          />
          <br />
          Job:{" "}
          <input
            type={"text"}
            value={job}
            onChange={(e) => setJob({ job: e.target.value })}
          />
        </p>
        <p>
          (Parent State Passed to Child) <br />
          Name: {props.parentState.name} <br />
          Home: {props.parentState.home}
        </p>
        <p>
          (Child State) <br />
          Brother: {brother} <br />
          Job: {job}<br />
          <button onClick={props.skaiciuok}>parent counte</button><br />
          <p>{props.count}</p>
          <button onClick={skaiciuok}>child counter</button><br />
          <p>{number}</p>
        </p>
      </div>
    );
  }


   background-image: url(../img/arrow.jpg), -moz-linear-gradient(top, #E5E5E5, #F4F4F4); /* For old Firefox (3.6 to 15) */
    background-image: url(../img/arrow.jpg), -ms-linear-gradient(top, #E5E5E5, #F4F4F4); /* For pre-releases of Internet Explorer  10*/
    background-image: url(../img/arrow.jpg), -o-linear-gradient(top, #E5E5E5, #F4F4F4); /* For old Opera (11.1 to 12.0) */
    background-image: url(../img/arrow.jpg), linear-gradient(to bottom, #E5E5E5, #F4F4F4); /* Standard syntax; must be last */
