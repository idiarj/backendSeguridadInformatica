import { Sender } from "../../models/business/sender.js";
import { FsUtils } from "../../utils/fsUtils.js";
export class SenderController{
    static async sendTxt(req, res){
        try {
            console.log(req)
            // console.log(aes_key)
            // console.log('-------------------------------')
            // console.log(application.path)
            // console.log(req.cookies)
            // console.log('data usuario', req.user)

            const [aes_key, application] = req.files;
            const {title, description} = req.body;
            const {id_user} = req.user;

            await Sender.sendTxt({file_name: application.originalname, file_path: application.path, description, id_user, id_algorithm: 1});
            return res.status(200).send({message: "TXT sent, check console"});
        } catch (error) {
            console.log('Error al enviar el DOCX:', error);
            return res.status(500).send({message: error.message});
        }
    }
}