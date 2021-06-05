import React from 'react'
import axios from 'axios'
import { Console } from 'console';

export class SubscriptionController{

    private server;
    constructor(){
        this.server = axios.create()
    }

    public addDailySub = async (user: string, base: string, sub: string ) => {
        try{ 
            var userID = JSON.parse(sessionStorage.getItem('user')|| '{}').user.cus_id  
            console.log(user, base, sub)
            const obj = {cus_id: userID, user: user, base: base, sub: sub}
            let res = await this.server.post('http://localhost:5000/daily', {
                cus_id: obj.cus_id,
                user: obj.user,
                base: obj.base,
                sub: obj.sub,
            }).then((res) => {
                console.log('daily added')
                console.log(res)
            })
        }catch(err){
            console.log(err)
        }

    }

    public addConditionalSub = async (user: string, con: string, base: string, sub: string) => {
        try{ 
            console.log(JSON.parse(sessionStorage.getItem('user')|| '{}').user.cus_id)
            var userID = JSON.parse(sessionStorage.getItem('user')|| '{}').user.cus_id
            console.log(userID)
            const obj = {cus_id: userID, user: user, con: con, base: base, sub: sub}
            let res = await this.server.post('http://localhost:5000/threshold', {
                cus_id: obj.cus_id,
                user: obj.user,
                condition: obj.con,
                base: obj.base,
                sub: obj.sub,
            }).then((res) => {
                console.log('conditional added')
                console.log(res)
            })
        }catch(err){
            console.log(err)
        }
    }

}