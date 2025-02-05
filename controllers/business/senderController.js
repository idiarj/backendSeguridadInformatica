import { Sender } from "../../models/business/sender.js";
import { FsUtils } from "../../utils/fsUtils.js";
import { exec_cmd } from "../../utils/execCmd.js";
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

            console.log(req.body)
            const { id_user } = req.user;
            const file_name = application.originalname;
            const licitacionPath = `./encrypted/${name}`;
            await FsUtils.mkdir({ path: licitacionPath });
            console.log(process.cwd())
            await exec_cmd(`"${process.cwd()}/encrypter.exe" -c .`);
            await FsUtils.rename({oldPath: `./private.pem`, newPath: `${licitacionPath}/private_${name}.pem`});
            await FsUtils.rename({oldPath: `./public.pem`, newPath: `${licitacionPath}/public_${name}.pem`});

            await exec_cmd(`"${process.cwd()}/encrypter.exe" -d .`);
            await Sender.sendTxt({file_name, file_path: application.path, description, id_user, id_algorithm: 1});
            return res.status(200).send({message: "TXT sent, check console"});
        } catch (error) {
            console.log('Error al enviar el DOCX:', error);
            return res.status(500).send({message: error.message});
        }
    }
}