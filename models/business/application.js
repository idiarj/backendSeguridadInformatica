import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";


export class Application {
    static async getApplicationsAdmin(){
        try {
            let key, applications;

            key = 'getApplicationsAdmin';
            applications = await appSeguridadInfDB.exeQuery({key})
            //console.log(applications)
            return {applications}
        } catch (error) {
            throw error;
        }
    }

    static async updateApplication({application_id, status}){
        try {
            const key = 'updateApplication';
            const result = appSeguridadInfDB.exeQuery({key, params: [status, application_id]})
            return {success: true, result}
        } catch (error) {
            throw error;
        }
    }

    static async getApplicationsUser({id_user}){
        try {
            const key = 'getApplicationsUser';
            const params = [id_user]
            const application = await appSeguridadInfDB.exeQuery({key, params})
            console.log('aasdas',application)
            return {success: true, application}
        } catch (error) {
            throw error
        }
    }

    static async getApplication({application_id}){
        try {
            console.log('a',application_id)
            const key = 'getApplication';
            const params = [application_id]
            const [application] = await appSeguridadInfDB.exeQuery({key, params})
            console.log('en el modelo',application)
            return {success: true, path: application.path}
        } catch (error) {
            throw error;
        }
    }

}