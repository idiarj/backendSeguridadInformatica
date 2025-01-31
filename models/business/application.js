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

}