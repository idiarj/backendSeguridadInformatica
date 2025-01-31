
import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";


export class AuthModel {

    static async login({username, email, password}){
        try {
            console.log(username)
            console.log(password)
            const user = await appSeguridadInfDB.exeQuery({key: 'validateUser', params: [username]})
            console.log(user)
            return true
        } catch (error) {
            throw error;
        }
    }

    static async register({user, email, password, enterprise}){
        try {
            
        } catch (error) {
            throw error;
        }
    }

    static async logout({token}){
        try {
            
        } catch (error) {
            throw error;
        }
    }
}