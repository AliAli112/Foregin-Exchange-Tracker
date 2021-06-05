import React, { useEffect, useState } from 'react'
import { FixerAPIController } from '../Application/FixerAPIController'
import { SubscriptionController } from '../Application/SubscriptionController'
import  CurrencyRow  from './conponents/currencyrow'
import './styles/threshold.css'


export const Threshold = () => {
    const [currencyOptions, setcurrencyOptions] = useState(['JMD','USD'])
    const [fromCurrency, setFromCurrency] = useState('EUR')
    const [toCurrency, setToCurrency] = useState('JMD')
    const [exchangeRate, setExchangeRate] = useState() 
    const [toAmount, setToAmount] = useState('')
    const [fromAmount, setFromAmount] = useState(1)


    const APIController = new FixerAPIController()
    const controller = new SubscriptionController()
    let data


    useEffect(() => {
        async function call(){
            var data = await APIController.fetchData()
            if(data.success){
                setcurrencyOptions([data.base, ...Object.keys(data.rates)])
                console.log(data.rates[toCurrency] / data.rates[fromCurrency])
                setExchangeRate(data.rates[toCurrency] / data.rates[fromCurrency])
                console.log(exchangeRate)
                setToAmount(exchangeRate)
            }
            
        }
        call()
    }, [toCurrency, fromCurrency, exchangeRate])

    function handleSubmit(e){
        var user = JSON.parse(sessionStorage.getItem('user')).user
        var usertosend = {userEmail: user.userEmail, userFirstName: user.userFirstName, userLastName: user.userLastName}
        e.preventDefault()
        if(e.target.daily.checked){
            controller.addDailySub(JSON.stringify(usertosend), fromCurrency, toCurrency)
            e.target.daily.checked = false
        }
        var condition = e.target.condition.value
        var v = parseFloat(toAmount).toFixed(6)
        var base = {from: fromCurrency, con: fromAmount.toFixed(6)}
        var sub = {from: toCurrency, con: v}
        console.log(base, sub)
        if(condition === 'equal'){
            if(toAmount === exchangeRate)
            {
                alert('=')
            }else{
                //if there are no errors    
                //store to database
                controller.addConditionalSub(JSON.stringify(usertosend), condition, JSON.stringify(base), JSON.stringify(sub))
            }
        } 
        else if(condition ==='less than'){
            if(toAmount > exchangeRate)
            {
                alert('The exchange rate is already less')
            }else{
                controller.addConditionalSub(JSON.stringify(usertosend), condition, JSON.stringify(base), JSON.stringify(sub))     //store to database subscription controller conditionalsub
            }
        } 
        else if(condition === 'greater than'){
            if(toAmount < exchangeRate)
            {
                alert('The exchange rate is already more')
            }else{
                controller.addConditionalSub(JSON.stringify(usertosend), condition, JSON.stringify(base), JSON.stringify(sub))     //store to database subscription controller conditionalsub
            }
        }
        
        
    }

    return (
        <div>
            <h1>Subscription Area</h1>
            <form onSubmit={handleSubmit}>
                <div className='daily'>
                    <input className='check' type="checkbox" name="daily" value="daily"/>
                    <label for="daily">Receive Daily Updates</label>
                </div>
                <div className='tooltip'>
                <CurrencyRow currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                amount={fromAmount}
                />
                <span className="tooltiptext">Cannot edit amount for precision purposes</span>
                </div>
                <div className='equal-group'>
                    <input type="radio" value="equal" name="condition"/><div className='equals'>=</div>
                    <input type="radio" value="less than" name="condition" /><div className='equals'> {'≤'} </div>
                    <input type="radio" value="greater than" name="condition" /><div className='equals'>{'≥'} </div>
                </div>
                <CurrencyRow currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)} 
                amount={toAmount}
                onChangeAmount={e => setToAmount(e.target.value)}
                />
                <button className="thr-btn">Subscribe</button>
            </form>
        </div>
    )
}