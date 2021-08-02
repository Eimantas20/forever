import { Link } from 'react-router-dom';


import react, {useState, useEffect} from 'react';

const About = (props) => {
    const [number, setNumber] = useState(0)

    const skaiciuok = () => setNumber(number + 1);
    const [value, setValue] = useState(
        localStorage.getItem('myValueInLocalStorage') || '');


        useEffect(() => {
            localStorage.setItem('myValueInLocalStorage', value);
        }, [value])
        
        
    
    const onChange = event => setValue(event.target.value);

    return (
        <div>
            <h1>{'ABOUT'}</h1>
            <h2>{'Apie mane'}</h2>
            <button onClick={skaiciuok}>skaiciuok local</button>
            <p>{number}</p>
            <br />
            <button onClick={props.skaiciuok}>skaiciuok parent comp</button>
            <p>{props.count}</p>
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
            dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
            Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
            sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.</p>
            <Link to="/about/testingFlickering">
                <button> Go to testingFlickering </button>
            </Link>
        </div>
    )
}

export default About;