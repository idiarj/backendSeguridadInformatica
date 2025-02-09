import { Application } from "../../models/business/application.js";

export class applicationController{

    static async ApplicationsGET(req, res){
        try {
            console.log('joli')
            //console.log(req.user)
            const {id_user} = req.user
            console.log('ab', req.user)
            const {applications} = await Application.getApplications({id_user})
            // console.log('as',applications)
            return res.status(200).json({success: true, applications})
        } catch (error) {
            console.log(error)
            res.status(401).json({error: error, errorMessage: 'Error al obtener las licitaciones.'})
        }
    }

    static async getApplication(req, res){
        try {
            const {application_id} = req.body
            const application = await Application.getApplication({application_id})
            return res.status(200).json({success: true, application})
        } catch (error) {
            res.status(401).json({error: error, errorMessage: 'Error al obtener la licitación.'})
        }
    }

    static async updateApplication(req, res){
        try {
            const {application_id, id_state} =  req.body
            const application = await Application.updateApplication({application_id, id_state})
            return res.status(200).json({success: true, application})
        } catch (error) {
            res.status(401).json({error: error, errorMessage: 'Error al actualizar la licitación.'})
        }
    }

    static async downloadKey(req, res){
        try {
            console.log('joli')
            const keyPath = path.join(__dirname, '../../../keys/public.key')
            console.log(keyPath)
            res.download(keyPath)
        } catch (error) {
            return res.status(500).json({error: error.message, errorMessage: 'Error al descargar llave.'})
        }
    }
}