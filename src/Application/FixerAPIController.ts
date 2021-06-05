import React from 'react';
import fixerapi  from '../Persistence/fixerAPI/fixer'



export class FixerAPIController {
    
    constructor(){
        this.fetchData()
    }

    public fetchData = async () => {
        var exchangerates;
        var data;
        //console.log(process.env.PUBLIC_URL + '/nodefixrates.txt')
        //This function checks if the result from the API is already cached in local storage
        //If it isn't then it calls the API and stores it then.
        
        await fetch('http://localhost:5000/file/get')
            .then((r) => r.text())
            .then(text  => {
            exchangerates = text;
            console.log(exchangerates)
            localStorage.setItem('fixrates', exchangerates)
            })  
        let lstorage = localStorage.getItem('fixrates')
        console.log(lstorage)

        if (!lstorage){
            await fetch(fixerapi.base + fixerapi.key)
            .then(res => res.json())
            .then(result => {
                lstorage = result
                console.log(lstorage)
                localStorage.setItem('fixrates', JSON.stringify(lstorage))
                data = lstorage
                console.log(data)
            })
        }else{
            data =  JSON.parse(localStorage.getItem('fixrates') || '{}')
            return data
        }

        return JSON.parse(lstorage || '{}')
        
    }

}