import { AuthModel } from "../../models/auth/authModel.js"
import { userValidation } from "../../instances/security/validationInstances.js"
import { jwtToken } from "../../utils/jwtManger.js"
export class AuthController {
    static async login(req, res){
        try {
            console.log('----LOGIN CONTROLADOR----')
            const {username, password} = req.body
            console.log('req.body', req.body)
            if(req.cookies.access_token) {
                console.log('Ya hay una sesion activa.')
                res.clearCookie('access_token')
                return res.status(400).json({message: 'Ya hay una sesion activa.'})
            }
            const validData = await userValidation.validatePartial(req.body)
            if(!validData.success) return res.status(400).json({error: validData.error.issues[0].message})
            
            const validLogin = await AuthModel.login({username, password})
            if(!(validLogin.success)) return res.status(400).json({
                mensaje: 'No se pudo iniciar sesion, usuario o contraseña incorrectas.'
            })
            console.log('sali del modelo')
            const [user] = validLogin.user
            console.log(user)
            const token = jwtToken.generateToken({payload: {id_user: user.id_user, username: user.username, user_type: user.id_user_type}, expiresIn: '1h'});
            res.cookie('access_token', token)
            console.log('Login exitoso.')
            return res.status(200).json({mensaje: 'Login exitoso.'});
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error.message, errorMessage: 'Error al iniciar sesion.'})
        }
    }

    static async register(req, res){
        try {
            console.log(req.body)
            const validData = await userValidation.validateTotal(req.body);

            if(!validData.success) return res.status(400).json({error: validData.error.issues[0].message})

            const {username, email, password} = req.body

            
            const register = await AuthModel.register({user: username, email, password})
            console.log('register', register)
            if(!register.success) return res.status(400).json({message: register.message})

            return res.status(200).json({mensaje: register.message})

        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error.message, errorMessage: 'Error al registrar usuario.'})
        }
    } 

    static async logout(req, res){
        try {
            console.log(req.cookies)
            const token = req.cookies.access_token
            if(!token) return res.status(400).json({message: 'No hay token de acceso.'})
            res.clearCookie('access_token')
            return res.status(200).json({message: 'Sesión cerrada.'})
        } catch (error) {
            return res.status(500).json({error: error.message, errorMessage: 'Error al cerrar sesión.'})
        }
    }
}