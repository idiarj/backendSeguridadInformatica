
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

    static async register({user, email, password, enterprise, user_type}) {
        try {
            const userAlreadyExists = await this.validateUser({username: user, email})
            if(userAlreadyExists) return {success: false, message: 'El usuario ya existe.'}
            const key = 'registerUser'
            const params = [user, email, password, enterprise, user_type]
            await appSeguridadInfDB.exeQuery({
                key,
                params
            })
            return {success: true, message: 'Usuario registrado correctamente.'}
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
            console.log(error)
            throw error;
        }
    }
}