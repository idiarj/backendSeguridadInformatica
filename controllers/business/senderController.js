import { Sender } from "../../models/business/sender.js";
import { FsUtils } from "../../utils/fsUtils.js";
import { exec_cmd } from "../../utils/execCmd.js";
import fs from 'fs';
import path from 'path';

export class SenderController{
    static async sendTxt(req, res){
        try {

            console.log(req.body);
            console.log(req.files);
            console.log(req.user);

            const [application, aes_key] = req.files;
            const {title, description} = req.body;
            const { id_user } = req.user

            console.log(title, description);

            await FsUtils.mkdir({path: path.join('./encrypter', 'encrypted', title)})
            console.log('Folder created')

           

            console.log('Files renamed')

            const directoryPath = path.join('./encrypter');

            fs.access(directoryPath, fs.constants.W_OK, (err) => {
                if (err) {
                    console.error(`No write access to directory: ${directoryPath}`);
                } else {
                    console.log(`Write access to directory: ${directoryPath}`);
                }
            });

            const cmd_decrypt = `cmd /c .\\encrypter.exe -d ./uploads/${application.filename} ./keys/private.pem ./uploads/${aes_key.filename}`;
          
            try {
                await exec_cmd(cmd_decrypt);
            } catch (error) {
                console.error('Error executing decryption command:', error);
                return res.status(500).send({ message: 'Error executing decryption command' });
            }

            setTimeout(async () => {
                try {
                    await FsUtils.rename({oldPath: application.path, newPath: path.join('./encrypter', 'encrypted', title, application.filename )})
                    await FsUtils.rename({oldPath: aes_key.path, newPath: path.join('./encrypter', 'encrypted', title, aes_key.filename )})
                    await FsUtils.mkdir({ path: path.join('./encrypter', 'decrypted', title) });
                    await FsUtils.rename({ oldPath: path.join('out.txt'), newPath: path.join('./encrypter', 'decrypted', title, `${application.filename}`) });
                    await FsUtils.rename({oldPath: application.path, newPath: path.join('./encrypter', 'encrypted', title, application.filename )})
                    await FsUtils.rename({oldPath: aes_key.path, newPath: path.join('./encrypter', 'encrypted', title, aes_key.filename )})
                    await FsUtils.rename({oldPath: path.join('./uploads', 'private.pem'), newPath: path.join('./encrypter', 'encrypted', title, 'private.pem')})
                    console.log('Reorganazing files...');
                } catch (error) {
                    console.error('Error during file operations:', error);
                }
            }, 3000);

            console.log('sali');

            try {
                await Sender.sendTxt({ file_name: title, file_path: path.join('./encrypter', 'decrypted', title, `${application.filename}`), description, id_user, id_algorithm: 1 });
                return res.status(200).send({ message: "TXT sent, check console" });
            } catch (error) {
                console.log('Error sending the TXT:', error);
                return res.status(500).send({ message: error.message });
            }
        } catch (error) {
            console.log('Error al enviar el DOCX:', error);
            return res.status(500).send({message: error.message});
        }
    }
}