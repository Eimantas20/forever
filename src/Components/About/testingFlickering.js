import React, {Component} from 'react';
import OneProductCard from '../Products/OneProductCard';
import TestingFuckingFlickeringProduct from '../Products/testingFuckingFlickeringProduct';

class TestingFlickering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {},
            count: 0
        }
    }
    // componentWillMount = (props) => {
    //     console.log(props)
    //     this.setState({products: Object.values(this.props.products)}, ()=>console.log(this.state.products))
    // }

    counter = () => this.setState({count: this.state.count + 1 });

   

    render() {

        return (
            // !(this.state.products > 0) ? 
            <div>
                <h1>Child component</h1>
                <button onClick={this.counter} >Child counter</button>
                <h1>{this.state.count}</h1>
                <h1>From Parent component</h1>
                <button onClick={this.props.skaiciuok}> parent counter</button>
                <h1>{this.props.count}</h1>
                {/* <div>
                        {this.state.products.map(singleProduct => <OneProductCard singleProduct={singleProduct} changeQuantities={this.props.changeQuantities} key={singleProduct.id} changeViewButton={this.changeView} />)}
                </div> */}
            </div>
            // : null
        ) 
    }

}

export default TestingFlickering;