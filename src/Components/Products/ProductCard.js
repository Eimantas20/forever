import { render } from '@testing-library/react';
import React, {Component} from 'react';
import './ProductCard.css';
import ObjectPage from './ObjectPage.js'


class ProductCard extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            pages: null
        }
    }
    // constructor() {
    //     super();
    //     this.state = {
    //         products: {
    //             id: this.products.data.id,
    //             name: this.product.data.name,

    //         }
    //     }
    // }

  

    componentDidMount = (res, req) => {        
        fetch('http://localhost:3000/products')
            .then((response) => response.json())
            // .then((response) => { console.log(response); return response; })
            .then((data) => { this.setState({ 
                products: data.data})})
                .then((data) => { this.calculate()} )
            // .then((this.state.products) => { this.setState({ meta: products.length }) })
            // .then((products) => console.log(products))
            // .catch(error => console.log(error))
    }

    // viewDetails = (products) => {
    //         return console.log(products)
    //     }
    calculate = function () {
        const totalProducts = this.state.products.length / 10;
        if (Number.isInteger(totalProducts)) {
            return this.setState({ pages: totalProducts })
        //    return console.log(`number is integer ${pages}`)
        } else {
            return this.setState({ pages: Math.ceil(totalProducts)});
            // return console.log(`number is integer from else ${Math.ceil(pages)}`)
        }
    }

    createPage = () => {
    const rows = [];
    for (let i = 1; i <= this.state.pages; i++) {  
        rows.push(<ObjectPage data={i} />)
        }
        return rows;
    }

    render() {    
        const {products, pages} = this.state;
        // this.calculate();
        // console.log(page);
        // console.log(products);
        // console.log(`This is pages ${pages}`);
        // console.log(i);
        return (
            <div>
                <nav>
                    <ul className="productNav">
                        <li>Bičių produktai</li>
                        <li>Eteriniai aliejai</li>
                        <li>Odos priežiūros</li>
                        <li>Svorio reguliavimas</li>
                        <li>Maisto papildai</li>
                        <li>Gėrimai</li>
                        <li>Higienos priemonės</li>
                    </ul>
                </nav>
                {/*{products.slice(0, 10).map((product) => {*/}
                {products.slice((i-1)*10, i*10).map((product) => {
                    return (
                        <div className="productBox">
                            id={product.id}
                            <h1>{product.name}</h1>
                            <h3>{product.description}</h3>
                        </div>
                    )
                })}
               {this.createPage()}

            </div>
        )
    }
}

export default ProductCard;