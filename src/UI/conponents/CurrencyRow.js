import React from 'react'
import '../styles/currencyrow.css'

export default function CurrencyRow ({currencyOptions, selectedCurrency, 
    onChangeCurrency, amount, onChangeAmount}) {

    return(
        <div>
            <input className='field' type='number' value={amount}  onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option =>(
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}