import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useParams,
    useRouteMatch
} from "react-router-dom";
import PropTypes from 'prop-types';
import './AllProducts.css';
import FullProductDescription from './FullProductDescription.js';

function OneProductCard(props) {
    let {path, url} = useRouteMatch();
    const [ bgColor, changeColor ] = useState("");
    // let [ passUrl, passUrlUp ] = useState("");
    // let [ passPath, passPathUp] = useState("");

    let passUrl = url;
    let passPath = path;
    let desiredProductId = props.singleProduct.id;
    // const changeLinks=()=>{
    //     passUrlUp(url )
    //     passPathUp(props.singleProduct.id )
    //     console.log(url )
    // }
    console.log(path);
    console.log(url);
    let kebybis = "kebybiene";
    const joined = (props) => {
        changeColor(('red'));
        props.addToBasket(props.singleProduct);
    }
    // console.log(`${url}/${props.singleProduct.id} + url`)
    // console.log(`${path}/${props.singleProduct.id} + path`)
    return (
        

        <div>
    
       
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
                        <button className="orderButton" style={{backgroundColor: bgColor}} onClick={()=>joined(props)}>Užsakyti</button>
                    </div>
                </div>
            </div>
           
            <Route path={`${path}/${props.singleProduct.id}`} >
                <FullProductDescription kebybis={kebybis} {...props}/>
            </Route>

            {/* <Route path={`${path}/${props.singleProduct.id}`}
                key={props.singleProduct.id}
                name={props.singleProduct.name}
                component={(props) => <FullProductDescription {...props} bgColor={bgColor} key={props.singleProduct.id}/>}>
                //Use one or the other
                <FullProductDescription key={props.singleProduct.id}></FullProductDescription>
            </Route> */}
          
          
        </div>
    )
}



// class OneProductCard extends Component {
//     constructor() {
//         super();
//         this.state = {
//             bgColor: ""
//         }
      
//     }
//     joined = () => {
//         this.addToBasket();
//         this.paintButton();
//     }

 
//     addToBasket = () => {
//         this.props.addToBasket(this.props);
//     }
//     paintButton = () =>{
//         this.setState({ bgColor: "red" })
//     }
//     changeView = (properciai) => {
//         this.props.changeView(properciai);
//    }

//     render() {
//         const properciai = this.props;
//         // console.log(properciai)
//         return (
//             <div className="productBox">
               
//                     <div>
//                         <div>
//                             <img onClick={()=>this.changeView(properciai)} className="productImage" src="https://i0.wp.com/alavijoproduktai.lt/wp-content/uploads/2017/03/beta-copy.jpg?resize=560%2C560&ssl=1" alt="Product picture"/>
//                             <h1 style={{fontSize: "2rem"}}>{this.props.name}</h1>
//                             <h3 style={{ fontSize: "1rem" }}>{this.props.description}</h3>
//                             <p style={{margin: "0.2rem" }}>€ {this.props.price}</p>
//                             <button className="orderButton" style={{backgroundColor: this.state.bgColor}} onClick={this.joined}>Užsakyti</button>
//                         </div>
//                     </div>
//             </div>
//         )
//     }
// }

export default OneProductCard;