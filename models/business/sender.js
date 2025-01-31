import { appSeguridadInfDB } from "../../instances/database/iPgManager.js";

export class Sender{


    static async sendPDF({pdf_file}){
        try {
            console.log(pdf_file);
        } catch (error) {
            throw error;
        }
    }

    static async sendDocx({docx_file}){
        try {
            console.log(docx_file);
        } catch (error) {
            throw error;
        }
    }
}