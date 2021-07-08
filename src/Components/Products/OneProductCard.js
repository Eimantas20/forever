import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './AllProducts.css'

class OneProductCard extends Component {
    constructor() {
        super();
        this.state = {
            bgColor: ""
        }
      
    }
    joined = () => {
        this.addToBasket();
        this.paintButton();
    }

 
    addToBasket = () => {
        this.props.addToBasket(this.props);
    }
    paintButton = () =>{
        this.setState({ bgColor: "red" })
    }
    changeView = (properciai) => {
        this.props.changeView(properciai);
   }

    render() {
        const properciai = this.props;
        // console.log(properciai)
        return (
            <div className="productBox">
               
                    <div>
                        <div>
                            <img onClick={()=>this.changeView(properciai)} className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture"/>
                            <h1 style={{fontSize: "2rem"}}>{this.props.name}</h1>
                            <h3 style={{ fontSize: "1rem" }}>{this.props.description}</h3>
                            <p style={{margin: "0.2rem" }}>€ {this.props.price}</p>
                            <button className="orderButton" style={{backgroundColor: this.state.bgColor}} onClick={this.joined}>Užsakyti</button>
                        </div>
                    </div>
                
                  
                
            </div>
        )
    }
}

export default OneProductCard;