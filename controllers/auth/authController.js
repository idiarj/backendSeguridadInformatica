import { AuthModel } from "../../models/auth/authModel.js"
import { userValidation } from "../../instances/security/validationInstances.js"
import { CryptManager } from "../../utils/bcryptUtil.js"
import { jwtToken } from "../../utils/jwtManger.js"
export class AuthController {
    static async login(req, res){
        try {
            console.log('----LOGIN CONTROLADOR----')
            const {username, password} = req.body
            console.log('req.body', req.body)

            const validData = await userValidation.validatePartial(req.body)
            if(!validData.success) return res.status(400).json({error: validData.error.issues[0].message})
            
            const validLogin = await AuthModel.login({username, password})
            if(!validLogin) return res.status(400).json({
                mensaje: 'No se pudo iniciar sesion, usuario o contraseña incorrectas.'
            })


            const token = jwtToken.generateToken({payload: {username}, expiresIn: '1h'});
            res.cookie('access_token', token)
            return res.status(200).json({message: 'Login exitoso.'});
        } catch (error) {
            return res.status(500).json({error: error.message, errorMessage: 'Error al iniciar sesion.'})
        }
    }

    static async register(req, res){
        try {
            const validData = await userValidation.validateTotal(req.body);

            if(!validData.success) return res.status(400).json({error: validData.error.issues[0].message})

            const {username, email, password, enterprise, user_type} = req.body

            const hashedPassword = await CryptManager.encriptarData({data: password})

            const register = await AuthModel.register({user: username, email, password: hashedPassword, enterprise, user_type})
            console.log('register', register)
            if(!register.success) return res.status(400).json({message: register.message})

            return res.status(200).json({message: register.message})

        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error.message, errorMessage: 'Error al registrar usuario.'})
        }
    }

    static async logout(req, res){
        try {
            
        } catch (error) {
            return res.status(500).json({error: error.message, errorMessage: 'Error al cerrar sesión.'})
        }
    }
}