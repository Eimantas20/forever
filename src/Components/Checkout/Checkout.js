import './checkout.css';
import React, {useState} from 'react';
import {useLocation, Redirect} from 'react-router-dom';

const Checkout = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('mdwork20@gmail.com');
    const [number, setNumber] = useState('861111111')
    const [subject, setSubject] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [wrongEmail, warnEmail] = useState(false);
    const [wrongNumber, warnNumber] = useState(false);

    const location = useLocation();

    if (location.state === undefined) {
        return <Redirect to={"/cart"} />
    } else {

        const {productsInCart, totalPrice, deliveryOption, deliveryPrice, terminalLocation} = location.state;
        const validateEmail = (email, number) => {
            // eslint-disable-next-line
            const mailForamt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            email.match(mailForamt) ?
                validateNumber(number)
            : warnEmail(true)
        }

        const validateNumber = (number) => {
            // eslint-disable-next-line
            const phone11 = /^[\+\d]?\d{11}$/;
            const phone8 = /^\d{9}$/;
            (number.match(phone11) || number.match(phone8)) ?
                PostData()
                :warnNumber(true)
        }

        const PostData = () => {
            fetch('http://192.168.1.231:3000/checkout', {
                method: 'POST',
                headers: {
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
                    terminalLocation,
                    deliveryPrice
                })
            }).then(data=>{
                alert(data.body)
                console.log(data)
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
                    {(deliveryOption === 'DPD Kurjeris €5.99') &&
                        <div>
                            <h4>Pristatymo adresas</h4>  
                            <label>Butas, namo numeris, gatvė</label>
                            <input type="address" placeholder="49 butas, 16 namas, Išgalvota g." value={address} onChange={(e) => setAddress(e.target.value)} />
                            <label>Miestas</label>
                            <input type="city" placeholder=" " value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                    }
                    <button className="order" onClick={() => validateEmail(email, number)}>UŽSAKYTI</button>
                </div>
            </div>
        )
    }
}

export default Checkout