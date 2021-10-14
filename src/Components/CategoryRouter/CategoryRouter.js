import {
    Link,
    withRouter
} from "react-router-dom";
import React from 'react';
import './categoryRouter.css';

const CategoryRouter = (props) => {
    const { categories } = props;
    return (
        <div>
            <nav className="categoryNav">
                <ul className="productNav" >
                    {categories.map((category) => {
                        let isActive = `/categories/${category.url}` === window.location.pathname;
                        let buttonClass = isActive ? "activeCategory" : "inactiveCategory";
                        return <Link to={`/categories/${category.url}`} key={category.url}><li className={buttonClass}>{category.name}</li></Link>
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default withRouter(CategoryRouter);