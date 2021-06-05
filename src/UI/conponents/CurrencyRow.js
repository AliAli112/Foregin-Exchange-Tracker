import React from 'react'
import '../styles/CurrencyRow.css'

export default function CurrencyRow ({currencyOptions, selectedCurrency, 
    onChangeCurrency, amount, onChangeAmount}) {
    //currency options is the list of 
    return(
        <div>
            <input className='field' type='number' value={amount}  onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option =>(
                    <option key={option} value={option}>{option}</option>
                ))}
                {/* <option value="JMD">JMD</option> */}
            </select>
        </div>
    )
}