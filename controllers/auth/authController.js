import { AuthModel } from "../../models/auth/authModel.js"


export class AuthController {
    static async login(req, res){
        try {
            console.log('----LOGIN CONTROLADOR----')
            const {username, password} = req.body
            console.log(req.body)
            // validar datos OK
            const validLogin = await AuthModel.login({username, password})
            if(!validLogin) return res.status(400).json({
                mensaje: 'No se pudo iniciar sesion, usuario o contraseña incorrectas.'
            })
            return res.status(200).json({message: 'Login exitoso.'});
        } catch (error) {
            return res.status(500).json({error: error.message, errorMessage: 'Error al iniciar sesion.'})
        }
    }

    static async register(req, res){
        try {

            



        } catch (error) {
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