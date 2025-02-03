
import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";
import { CryptManager } from "../../utils/bcryptUtil.js";

export class AuthModel {

    static async login({username, email, password}){
        try {
            console.log('----LOGIN MODELO----')
            const user = await this.validateUser({username, email})
            console.log('user', user)
            const passwordValidation = await this.validatePassword({username, password})
            console.log('passwordValidation', passwordValidation)
            if((user.length > 0) && passwordValidation) return {success: true, user }
            return false
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    static async register({user, email, password, enterprise, user_type}) {
        try {
            const userAlreadyExists = await this.validateUser({username: user, email})
            const hashedPassword = await CryptManager.encriptarData({data: password})
            if(userAlreadyExists) return {success: false, message: 'El usuario ya existe.'}
            const key = 'registerUser'
            const params = [user, email, hashedPassword]
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
            console.log('user2', user)
            return user
        } catch (error) {
            console.log(error)
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
            console.log('user_password', user_password)
            console.log('password', password)
            const validPassword = await CryptManager.compareData({toCompare: password, hashedData: user_password})
            return validPassword
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}