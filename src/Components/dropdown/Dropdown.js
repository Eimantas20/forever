import React, { useState, useRef, useEffect } from 'react';
import './dropdown.css';

export default function Dropdown({
    options, 
    prompt, 
    value, 
    onChange
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [terminalStringifiedArray, setTerminalStringifiedArray] = useState([])
    const ref = useRef(null);
    const chars = { 
        'ą': 'a', 
        'č': 'c', 
        'ę': 'e', 
        'ė': 'e', 
        'į': 'i', 
        'š': 's', 
        'ų': 'u', 
        'ū': 'u',
        'ž': 'z' 
    }
 
    useEffect(()=>{
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);
 

    const optionsUnicode = (options) => {
        const terminalArray = options.map(Object.values).map(single =>
            // eslint-disable-next-line
            JSON.stringify(single).replace(/[\["\]']+/g, '').replace(/[\\,']+/g, ' ').toLowerCase().replace(/[ąčęėįšųūž]/g, m => chars[m]).split(' ').filter(e => e)
        )
        setTerminalStringifiedArray(terminalArray)
    }

    function close(e) {
        setOpen(e && e.target === ref.current)
    }

    function filter(options) {
        let viewTerminals = [];
        // let matchingTerminalsIds = [];
        const foo = {};
        
        // split queries to separates array comp and deletes empty spaces 
        const inputQuery = query.toLowerCase().replace(/[ąčęėįšųūž]/g, m => chars[m]).split(" ").filter(e => e)

        inputQuery.forEach(query => {
            //Checking one terminal
            const check = (terminalQuery) => {
                let number = terminalQuery.indexOf(query);
               
                return number >= 0;
            }
            
            terminalStringifiedArray.forEach(terminal => {
                if(terminal.some(check) === true) {
                    let terminalId = parseInt(terminal[0])
                    let terminalCount = (foo[terminalId]) ?? 0;
                    foo[terminalId] = (terminalCount) + 1;
                }
            })
            // matchingTerminalsIds = Object.keys(foo).filter(k=>foo[k] === inputQuery.length)
        })
        // matchingTerminalsIds.some(requestedTerminalId => {
        //     viewTerminals.push(options.filter(option => option.id === requestedTerminalId))
        // })
        // matchingTerminalsIds.some(requestedTerminalId => {
        //     viewTerminals.push(options.filter(option => option.id.includes(requestedTerminalId)))
        // })
        return inputQuery.length === 0 ? options : viewTerminals.flat()
    }

    function displayValue() {
        if (query.length > 0) return query;
        if (value) return `${value.city}, ${value.name}, ${value.address}`;

        return "";
    }

    return(
       (options === '' || options === undefined) ? null :
       <div className="dropdown">
            {/* <div className="control" onClick={()=>setOpen(prev => !prev), ()=> optionsUnicode(options)}> */}
            <div className="control" onClick={() => {setOpen(prev => !prev); optionsUnicode(options)}}>

                    <div className="selected-value" >
                        <input type="text" 
                            ref={ref} 
                            placeholder={value ? `${value.city}, ${value.name}, ${value.address}` : prompt} 
                            value={displayValue()} 
                            onChange={e => {
                                setQuery(e.target.value)
                                onChange(null)
                            }} 
                            onClick={()=>setOpen(prev => !prev)}
                            />
                    </div>
                <div className={`arrow ${open ? "open" : null}`}/>
            </div>
            <div className={`options ${open ? "open" : null}`}>
            {filter(options).map((option) => (
                <div key={option.id} className={`option ${value === option ? "selected" : null}`}
                onClick={()=>{
                    setQuery("")
                    onChange(option)
                    setOpen(false);
                    }}>{option.city}, {option.name}, {option.address}</div>))
            }
        </div>
    </div>
    )}