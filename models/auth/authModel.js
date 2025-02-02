
import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";


export class AuthModel {

    static async login({username, email, password}){
        try {
            console.log('----LOGIN MODELO----')
            const usernameValidation = await this.validateUser({username, email})
            const passwordValidation = await this.validatePassword({username, password})
            if(usernameValidation && passwordValidation) return true
            return false
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

    static async validateUser({username, email}){
        try {
            const key = 'validateUser'
            const params = [username]
            const user = await appSeguridadInfDB.exeQuery({
                key,
                params
            })
            return user.length > 0
        } catch (error) {
            throw error;
        }
    }

    static async validatePassword({username, password}){
        try {
            const key = 'validatePassword'
            const params = [username]
            const [{user_password}] = await appSeguridadInfDB.exeQuery({
                key,
                params
            })
            return password === user_password
        } catch (error) {
            throw error;
        }
    }
}