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