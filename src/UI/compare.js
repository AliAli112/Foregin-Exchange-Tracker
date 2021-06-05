import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import CurrencyRow from './conponents/currencyrow'
import { FixerAPIController } from '../Application/FixerAPIController'
import './styles/hoverpopup.css'
import { Spinner } from './conponents/spinner'
import './styles/compare.css'

export const Compare = () => {
    const [currencyOptions, setcurrencyOptions] = useState(['banana', 'peaches', 'plums' ])
    const [fromCurrency, setFromCurrency] = useState('EUR')
    const [toCurrency, setToCurrency] = useState('JMD')
    const [exchangeRate, setExchangeRate] = useState() 
    const [amount, setAmount] = useState(1)
    const [changeFrom, setChangeFromAmount] = useState(true)
    const [loading, setLoading] = useState(true)

    let history = useHistory()
    const APIController = new FixerAPIController() 
    

    let toAmount, fromAmount, data
    if (changeFrom){
        fromAmount = amount
        toAmount = amount * exchangeRate
    }else{
        toAmount = amount
        fromAmount= amount / exchangeRate 
    }

    useEffect(() => {
        async function call(){
            data = await APIController.fetchData()
            console.log(data.success)
            if(data.success){
                setcurrencyOptions([data.base, ...Object.keys(data.rates)])
                console.log(data.rates[toCurrency])
                setExchangeRate(data.rates[toCurrency] / data.rates[fromCurrency])
                setLoading(false)
            }
        }
        call()
        
    },[loading, toCurrency, fromCurrency])
    console.log('loading',loading)


    function handleToChangeAmount(e){
        setAmount(e.target.value)
        setChangeFromAmount(false)
    }

    function handleFromChangeAmount(e){
        setAmount(e.target.value)
        setChangeFromAmount(true)
    }

    return(
        <div>
            {loading ? <Spinner /> : 
            <div>
                <h1>Compare Currencies</h1>
                <CurrencyRow currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeAmount={handleFromChangeAmount}
                />
                <div className='equals'>=</div>
                <CurrencyRow currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)} 
                amount={toAmount}
                onChangeAmount={handleToChangeAmount}
                />
                <div className="tooltip">
                    <button className='btn-sub' onClick={() => history.push('/subscribe')} >Subscribe</button>
                    <span className="tooltiptext">Subscribe to get daily updates</span>
                </div>
            </div>
            }
        </div>
    )
}

export default Compare;