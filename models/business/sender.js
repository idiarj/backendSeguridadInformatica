import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";


export class Sender{


    static async sendPDF({pdf_file}){
        try {
            console.log(pdf_file);
        } catch (error) {
            throw error;
        }
    }

    static async sendTxt({file_name, file_path, description, id_user, id_algorithm, file_type}){
        try {
            console.log('modelo')
            console.log(id_user)
            const key = 'insertTxtApplication';
            const params = [file_name, file_path, description, id_user, new Date()];
            const response = await appSeguridadInfDB.exeQuery({key, params});
            //console.log(response);
            return {success: true, response}
        } catch (error) {
            throw error;
        }
    }
}