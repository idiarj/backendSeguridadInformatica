import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";

export class Sender{


    static async sendPDF({pdf_file}){
        try {
            console.log(pdf_file);
        } catch (error) {
            throw error;
        }
    }

    static async sendTxt({file_name, txt_binary, description, id_user, id_algorithm, file_type}){
        try {
            const key = 'insertDocxApplication';
            const params = [file_name, txt_binary, description, id_algorithm, 1, file_type, id_user];
            const response = await appSeguridadInfDB.exeQuery({key, params});
            //console.log(response);
            return {success: true, response}
        } catch (error) {
            throw error;
        }
    }
}