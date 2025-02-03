import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";


export class Application {
    static async getApplications({user_type}){
        try {
            let key, applications;
            if(user_type === 'admin'){
                key = 'getApplicationsAdmin';
                applications = appSeguridadInfDB.exeQuery({key, params: [user_type]})
                return {success: true, adminApplications: applications}
            }
            key = 'getApplications';
            applications = appSeguridadInfDB.exeQuery({key, params: [user_type]})
            return {success: true, normalUserApplications: applications}
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

    static async getApplication({application_id}){
        try {
            const key = 'getApplication';
            const params = [application_id]
            const application = appSeguridadInfDB.exeQuery({key, params})
            return {success: true, application}
        } catch (error) {
            throw error
        }
    }

}