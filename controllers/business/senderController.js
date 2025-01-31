import { Sender } from "../../models/business/sender.js";

export class SenderController{
    static async sendDocx(req, res){
        try {
            // const {pdf_file} = req.body;
            // await Sender.sendPDF({pdf_file});
            console.log(req.file);
            console.log(req.body);
            return res.status(200).send({message: "DOCX sent, check console"});
        } catch (error) {
            return res.status(500).send({message: error.message});
        }
    }
}