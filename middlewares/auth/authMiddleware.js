import { decode } from "jsonwebtoken";
import { jwtToken } from "../../utils/jwtManger.js";

export const authMiddleware = (req, res, next)=>{
    try {
        console.log('cookie', req.cookies)
        const token = req.cookies.session_token;
        console.log(token)
        if(!token) return res.status(401).json({message: 'Acceso denegado. No se proporciona un token.', errorMessage: 'No se pudo iniciar sesion.'});
        
        const decoded = jwtToken.verifyToken({token});
        
        console.log('decoded', decoded);

        req.user = decoded;

        next();

    } catch (error) {
        throw error;
    }
}