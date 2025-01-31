import { Application } from "../../models/business/application.js";

export class applicationController{
    static async ApplicationsGET(req, res){
        try {
            //const {user} = req

             
        } catch (error) {
            res.status(401).json({error: error, errorMessage: 'Error al obtener las licitaciones.'})
        }
    }
}