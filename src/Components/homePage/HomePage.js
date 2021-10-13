import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './homepage.css';

class HomePage extends Component {

    render() {
        const {categories} = this.props;
        return (
            <div className="homePage">
                <Link to="/categories/">
                    <div className="homeLinkToCategories" />
                </Link>
                <div className="homeContainer">
                    <div className="imageLinks">
                        {categories.map((category) => {
                            return (
                                <Link key={category.url} to={`/categories/${category.url}`} >
                                    <div className="imgContainer" style={{ position: "relative" }}>
                                        <div className="maybe" >
                                            <img alt={category.name} className="fit" src={category.img}/>
                                            <p>{category.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage
