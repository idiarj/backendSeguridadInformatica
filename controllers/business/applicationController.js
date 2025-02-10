import { Application } from "../../models/business/application.js";
import path from 'path';
export class applicationController{

    static async getApplicationsAdmin(req, res){
        try {
            console.log('joli')
            //console.log(req.user)
            const {id_user, user_type} = req.params;
            if(user_type !== 1) return res.status(401).json({error: 'No autorizado', errorMessage: 'No tienes permisos para realizar esta acción.'})
            console.log('ab', req.user)
            const {applications} = await Application.getApplicationsAdmin({id_user})
            // console.log('as',applications)
            return res.status(200).json({success: true, applications})
        } catch (error) {
            console.log(error)
            res.status(401).json({error: error, errorMessage: 'Error al obtener las licitaciones.'})
        }
    }

    static async getApplicationsUser(req, res){
        try {

            const {id, id_user} = req.params

            // console.log(id)
            // console.log(id_user)
            if(id_user != id) return res.status(401).json({error: 'No autorizado', errorMessage: 'No puedes ver las licitaciones de otros usuarios.'})
            const {application} = await Application.getApplicationsUser({id_user: id})
            console.log(application)
            return res.status(200).json({success: true, application})
        } catch (error) {
            console.log(error)  
            res.status(401).json({error: error, errorMessage: 'Error al obtener las licitaciones.'})
        }
    }

    static async downloadKey(req, res){
        try {
            console.log('joli')
            const keyPath = path.join('./keys', 'public.pem')
            console.log(keyPath)
            res.download(keyPath)
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error.message, errorMessage: 'Error al descargar llave.'})
        }
    }
        
    static async downloadApplication(req, res) {
        try {
            const { id } = req.params;
            console.log('params',id);
            const {path} = await Application.getApplication({ application_id: id });
            console.log('en el c', path);
            // const filePath = path.join(path);
            res.download(path);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message, errorMessage: 'Error al descargar aplicación.' });
        }
    }

    static async updateApplicationStatus(req, res){
        try {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
            const {id} = req.params
            const {id_state} = req.body
            console.log('g',req)
            const application = await Application.updateApplication({application_id: id, status: id_state})
            return res.status(200).json({success: true, application, message: `Licitacion ${id} actualizada.`})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: error.message, errorMessage: 'Error al actualizar la licitación.'})
        }
    }
}