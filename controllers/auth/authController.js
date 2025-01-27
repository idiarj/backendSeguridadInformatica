


export class AuthController {
    static async login(req, res){
        try {
            
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