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
            const application = appSeguridadInfDB.exeQuery({key, params})
            console.log(application)
            return {success: true, application}
        } catch (error) {
            throw error
        }
    }

}