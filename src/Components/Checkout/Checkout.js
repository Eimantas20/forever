import './checkout.css';
import React, {useState} from 'react';
import {useLocation, Redirect} from 'react-router-dom';

const Checkout = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('mdwork20@gmail.com');
    const [number, setNumber] = useState('')
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [wrongEmail, warnEmail] = useState(false);
    const [wrongNumber, warnNumber] = useState(false);

   
    const location = useLocation();
 if (location.state == undefined) {
        return <Redirect to={"/cart"} />
    } else {

    const {productsInCart, totalPrice, deliveryOption, deliveryPrice} = location.state;


    const validateEmail = (email, number) => {
        const mailForamt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        email.match(mailForamt) ?
            validateNumber(number)
        : warnEmail(true)
    }

    const testdata = () => {
        // console.log(productsInCart)
        // console.log(productsInCart[0])
        // const newObject = Object.assign({}, ...productsInCart.map(item => ({ [item.name]: item.value })));
        // // const newObject = Object.assign({}, ...productsInCart)
        // console.log(newObject)
    }
    const validateNumber = (number) => {
        const phone11 = /^[\+\d]?\d{11}$/;
        const phone8 = /^\d{9}$/;
        (number.match(phone11) || number.match(phone8)) ?
        PostData()
            :warnNumber(true)
        
    }

    const PostData = () => {
        fetch('http://localhost:3000/checkout', {
            method: 'POST',
            headers: {
                // 'Content-Type':'application/x-www-form-urlencoded',
                
                'Content-Type': 'application/json'

            },
            body:JSON.stringify({
                name, 
                surname,
                email,
                number,
                subject,
                address,
                city,
                productsInCart,
                totalPrice,
                deliveryOption,
                deliveryPrice
                
                    // "total": "$ 239.85", "items": [{
                    //     "text": "New Line Sneakers", "image": "https://marketing-image-production.s3.amazonaws.com/uploads/8dda1131320a6d978b515cc04ed479df259a458d5d45d58b6b381cae0bf9588113e80ef912f69e8c4cc1ef1a0297e8eefdb7b270064cc046b79a44e21b811802.png", "price": "$ 79.95"
                    // }
                    //     , {
                    //     "text": "Old Line Sneakers", "image": "https://marketing-image-production.s3.amazonaws.com/uploads/3629f54390ead663d4eb7c53702e492de63299d7c5f7239efdc693b09b9b28c82c924225dcd8dcb65732d5ca7b7b753c5f17e056405bbd4596e4e63a96ae5018.png", "price": "$ 79.95"
                    // }
                    //     , {
                    //     "text": "Blue Line Sneakers", "image": "https://marketing-image-production.s3.amazonaws.com/uploads/00731ed18eff0ad5da890d876c456c3124a4e44cb48196533e9b95fb2b959b7194c2dc7637b788341d1ff4f88d1dc88e23f7e3704726d313c57f350911dd2bd0.png", "price": "$ 79.95"
                    // }],
                    //  "receipt": true, "name": "Sample Name", "address01": "1234 Fake St.", "address02": "Apt. 123", "city": "Place", "state": "CO", "zip": "80202"
            })
        }).then(data=>{
            alert(data.body)
            console.log(data)
            setMessage('')
            setName('')
            setSurname('')
            setNumber('')
            setSubject('')
            setEmail('')
            setAddress('')
            setCity('')
        }).catch(err=>{
            console.log(err)
        })
    }
    console.log(deliveryOption);

    

    return (
        <div className="reset">
            <div className="centerCheckout">
                    <h4>Užpildykite užsakymo forma</h4>
                    <label>Vardas</label>
                    <input type="text"  value={name} onChange={(e) => setName(e.target.value)} />
                    <label>Pavardė</label>
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <label>Elektroninis paštas</label>
                    <input type="email" placeholder="paštas@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    {wrongEmail ? <p className="warning">Elektroninio pašto adresas įvestas netinkamai, prašome patikrinti</p> : null }
                    <label>Telefono numeris</label>
                    <input type="tel" placeholder="+370 " value={number} onChange={(e) => setNumber(e.target.value)} /> 
                    {wrongNumber ? <p className="warning">Telefono numeris įvestas neteisingas, prašome patikrinti</p>:null}
                    {(deliveryOption == 'DPD Kurjeris') && 
                        <div>
                            <h4>Pristatymo adresas</h4>  
                            <label>Butas, namo numeris, gatvė</label>
                            <input type="address" placeholder="49 butas, 16 namas, Išgalvota g." value={address} onChange={(e) => setAddress(e.target.value)} />
                            <label>Miestas</label>
                            <input type="city" placeholder=" " value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                    }
                    {/*<p className="deliveryNote">*pasirinkus pristatymą į paštomatą prašome suvesti norimo paštomato adresą</p> */}
                    {/* <input type="text" placeholder="subject" value={subject} onChange={(e) => setSubject(e.target.value)} /> */}
                    {/* greiciausiai ismesiu sita */}
                    {/* <textarea type="text" placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} /> */}
                <button className="order" onClick={() => validateEmail(email, number)}>UŽSAKYTI</button>
            </div>
            {/* <button className="order" onClick={() => PostData()}>Order</button> */}

        </div>
        
    
    )
}
}

export default Checkout