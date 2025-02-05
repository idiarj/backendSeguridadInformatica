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

            console.log(req.body)
            const { id_user } = req.user;
            const file_name = application.originalname;
            const licitacionDir = path.join(process.cwd(), 'encrypted', name);
            await FsUtils.mkdir({ path: licitacionDir });
            console.log(process.cwd());
            await exec_cmd(`"${path.join(process.cwd(), 'encrypter.exe')}" -c .`);
            await FsUtils.rename({ oldPath: path.join(process.cwd(), 'private.pem'), newPath: path.join(licitacionPath, `private_${name}.pem`) });
            await FsUtils.rename({ oldPath: path.join(process.cwd(), 'public.pem'), newPath: path.join(licitacionPath, `public_${name}.pem`) });
            await FsUtils.rename({ oldPath: application.path, newPath: path.join(licitacionPath, file_name) });
            const privateKeyPath = path.join(licitacionPath, `private_${name}.pem`);
            const publicKeyPath = path.join(licitacionPath, `public_${name}.pem`);
            const licitation_route = path.join(licitacionPath, file_name);
            
            console.log('Ruta de la llave privada:', privateKeyPath);
            console.log('Ruta de la llave pública:', publicKeyPath);
            const cmd_CSharp = `dotnet run --project "${path.join(process.cwd(), 'rsaEncrypter', 'program')}" -- encrypt "${licitation_route}" "${publicKeyPath}" "./aesKey.bin`
            const comandos_otra_gente = ``;
            await exec_cmd(cmd_CSharp);
            await Sender.sendTxt({ file_name, file_path: application.path, description, id_user, id_algorithm: 1 });
            return res.status(200).send({ message: "TXT sent, check console" });
        } catch (error) {
            console.log('Error al enviar el DOCX:', error);
            return res.status(500).send({message: error.message});
        }
    }
}