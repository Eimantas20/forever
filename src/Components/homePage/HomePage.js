import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './homepage.css';
import image_1 from '../../img/homepage/71fyxuOu-yL._SY606_.jpg';
import image_2 from '../../img/homepage/pexels-cecília-o-904621.jpg';
import image_3 from '../../img/homepage/pexels-fabrício-lira-2896162.jpg';
import image_4 from '../../img/homepage/pexels-yusuf-yulipurnawan-343188.jpg';
import image_5 from '../../img/homepage/pexels-linda-prebreza-286951.jpg';
import image_6 from '../../img/homepage/pexels-pixabay-268854.jpg';
import image_7 from '../../img/homepage/pexels-pixabay-459369.jpg';


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
                        {categories.map((category, image_1) => {
                            return (
                                <Link to={`/categories/${category.url}`} >
                                    <div className="imgContainer" style={{ position: "relative" }}>
                                        <div className="maybe" >
                                            <img alt={category.name} className="fit" src={category.img}/>
                                            <p>{category.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        {/* <Link to="/categories/biciu_produktai">
                            <div className="imgContainer" style={{ position: "relative" }}>
                                <div className="maybe" >
                            <img alt="" className="fit" src={image_1} />
                                </div>
                            </div>
                        </Link>
                        <Link to="/categories/eteriniai_aliejai">
                            <div className="imgContainer" style={{ position: "relative" }}>
                                <div className="maybe" >
                            <img alt="" className="fit" src={image_2}  content="lopas" />
                                </div>
                            </div>
                        </Link>
                        <Link to="/categories/odos_prieziura">
                            <div className="imgContainer" style={{ position: "relative" }}>
                                <div className="maybe" >
                            <img alt="" className="fit" src={image_3} />
                            <p>Odos priežiūra</p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/categories/svorio_reguliavimas">
                            <div className="imgContainer" style={{ position: "relative" }}>
                                <div className="maybe" >
                            <img alt="" className="fit" src={image_4} />
                                </div>
                            </div>
                        </Link>
                        <Link to="/categories/maisto_papildai">
                            <div className="imgContainer" style={{ position: "relative" }}>
                                <div className="maybe" >
                            <img alt="" className="fit" src={image_5} />
                                </div>
                            </div>
                        </Link>
                        <Link to="/categories/gerimai">
                            <div className="imgContainer" style={{position: "relative"}}>
                                <div className="maybe" >
                                    <img alt="" className="fit" src={image_6} />
                               </div>
                            </div>
                        </Link>
                        <Link to="/categories/higienos_priemones">
                            <div className="imgContainer" style={{position: "relative"}}>
                                <div className="maybe" >
                                    <img alt="" className="fit" src={image_7} />
                                </div>
                            </div>
                        </Link> */}

                    </div>
                    {/* <div className="maybe" >
                        <img alt="" className="fit2" src={image_3} />
                    </div> */}
                    
                </div>
            </div>
        )
    }

}

export default HomePage

// ---------------------------------------------------------------------------------------------------------------


// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import './homepage.css';
// import image_1 from '../../img/homepage/71fyxuOu-yL._SY606_.jpg';
// import image_2 from '../../img/homepage/pexels-cecília-o-904621.jpg';
// import image_3 from '../../img/homepage/pexels-fabrício-lira-2896162.jpg';
// import image_4 from '../../img/homepage/pexels-yusuf-yulipurnawan-343188.jpg';
// import image_5 from '../../img/homepage/pexels-linda-prebreza-286951.jpg';
// import image_6 from '../../img/homepage/pexels-pixabay-268854.jpg';
// import image_7 from '../../img/homepage/pexels-pixabay-459369.jpg';


// class HomePage extends Component {


//     render() {
//         const { categories } = this.props;
//         console.log(categories)
//         return (
//             <div className="homePage">
//                 <Link to="/categories/">
//                     <div className="homeLinkToCategories" />
//                 </Link>
//                 <div className="homeContainer">
//                     <div className="imageLinks">
//                         <Link to="/categories/biciu_produktai">
//                             <div className="imgContainer" style={{ position: "relative" }}>
//                                 <div className="maybe" >
//                                     <img alt="" className="fit" src={image_1} />
//                                 </div>
//                             </div>
//                         </Link>
//                         <Link to="/categories/eteriniai_aliejai">
//                             <div className="imgContainer" style={{ position: "relative" }}>
//                                 <div className="maybe" >
//                                     <img alt="" className="fit" src={image_2} content="lopas" />
//                                 </div>
//                             </div>
//                         </Link>
//                         <Link to="/categories/odos_prieziura">
//                             <div className="imgContainer" style={{ position: "relative" }}>
//                                 <div className="maybe" >
//                                     <img alt="" className="fit" src={image_3} />
//                                     <p>Odos priežiūra</p>
//                                 </div>
//                             </div>
//                         </Link>
//                         <Link to="/categories/svorio_reguliavimas">
//                             <div className="imgContainer" style={{ position: "relative" }}>
//                                 <div className="maybe" >
//                                     <img alt="" className="fit" src={image_4} />
//                                 </div>
//                             </div>
//                         </Link>
//                         <Link to="/categories/maisto_papildai">
//                             <div className="imgContainer" style={{ position: "relative" }}>
//                                 <div className="maybe" >
//                                     <img alt="" className="fit" src={image_5} />
//                                 </div>
//                             </div>
//                         </Link>
//                         <Link to="/categories/gerimai">
//                             <div className="imgContainer" style={{ position: "relative" }}>
//                                 <div className="maybe" >
//                                     <img alt="" className="fit" src={image_6} />
//                                 </div>
//                             </div>
//                         </Link>
//                         <Link to="/categories/higienos_priemones">
//                             <div className="imgContainer" style={{ position: "relative" }}>
//                                 <div className="maybe" >
//                                     <img alt="" className="fit" src={image_7} />
//                                 </div>
//                             </div>
//                         </Link>

//                     </div>
//                     {/* <div className="maybe" >
//                         <img alt="" className="fit2" src={image_3} />
//                     </div> */}

//                 </div>
//             </div>
//         )
//     }

// }

// export default HomePage