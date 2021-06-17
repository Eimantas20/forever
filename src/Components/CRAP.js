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