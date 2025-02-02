import { Sender } from "../../models/business/sender.js";
import { FsUtils } from "../../utils/fsUtils.js";
export class SenderController{
    static async sendDocx(req, res){
        try {
            // const {pdf_file} = req.body;
            // await Sender.sendPDF({pdf_file});
            console.log(req.file);
            console.log(req.body);
            const {originalname, path} = req.file;
            const txt_binary = await FsUtils.readFile(path);
            console.log(txt_binary);
            await Sender.sendTxt({file_name: originalname, txt_binary: txt_binary, id_user: 1, id_algorithm: 1});
            return res.status(200).send({message: "TXT sent, check console"});
        } catch (error) {
            console.log('Error al enviar el DOCX:', error);
            return res.status(500).send({message: error.message});
        }
    }
}