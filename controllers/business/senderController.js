import { Sender } from "../../models/business/sender.js";
import { FsUtils } from "../../utils/fsUtils.js";
import { exec_cmd } from "../../utils/execCmd.js";
import path from 'path';
export class SenderController{
    static async sendTxt(req, res){
        try {
            //console.log(req)
            // console.log(aes_key)
            // console.log('-------------------------------')
            // console.log(application.path)
            // console.log(req.cookies)
            // console.log('data usuario', req.user)

            const [aes_key, application] = req.files;
            const {name, description} = req.body;
            const { id_user } = req.user
            console.log(req.files)
            console.log(req.body)
            const aes_key_path = path.resolve(aes_key.path);
            const enc_file = path.resolve(application.path);
            console.log('La direccion de la llava aes es',aes_key_path)
            console.log('La direccion de licitacion', enc_file)
            await FsUtils.mkdir({path: `./encrypted/${name}`});

            const cmd_decrypt = `start .\\encrypter.exe -d ${aes_key_path} ${enc_file}`;
            await exec_cmd(cmd_decrypt);

            await FsUtils.rename({oldPath: aes_key_path, newPath: `./encrypted/${name}/${aes_key.filename}`});
            await FsUtils.rename({oldPath: enc_file, newPath: `./encrypted/${name}/${application.filename}`});

            console.log(cmd_decrypt)
            await Sender.sendTxt({ file_name: application.filename, file_path: application.path, description, id_user, id_algorithm: 1 });
            return res.status(200).send({ message: "TXT sent, check console" });
        } catch (error) {
            console.log('Error al enviar el DOCX:', error);
            return res.status(500).send({message: error.message});
        }
    }
}