import React from 'react';

const Contacts = (props) => {
    return (
        <div>
            <address>
                <h1>{`Please don't hesitate getting in touch on +37067975619`}</h1>
                <h2>{props.kintamasis}</h2> 
            </address>
        </div>
        
    )
}

export default Contacts;
