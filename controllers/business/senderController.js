import { Sender } from "../../models/business/sender.js";
import { FsUtils } from "../../utils/fsUtils.js";
import { exec_cmd } from "../../utils/execCmd.js";
import fs from 'fs';
import path from 'path';

export class SenderController{
    static async sendTxt(req, res){
        try {


            const [aes_key, application] = req.files;
            const {name, description} = req.body;
            const { id_user } = req.user

            
            await FsUtils.mkdir({path: path.join('./encrypter', 'encrypted', name)})
            console.log('Folder created')

            await FsUtils.rename({oldPath: application.path, newPath: path.join('./encrypter', 'encrypted', name, application.filename )})
            await FsUtils.rename({oldPath: aes_key.path, newPath: path.join('./encrypter', 'encrypted', name, aes_key.filename )})

            console.log('Files renamed')

            const directoryPath = path.join('./encrypter');

            fs.access(directoryPath, fs.constants.W_OK, (err) => {
                if (err) {
                    console.error(`No write access to directory: ${directoryPath}`);
                } else {
                    console.log(`Write access to directory: ${directoryPath}`);
                }
            });

            const cmd_decrypt = `.\\encrypter\\encrypter.exe -d .\\encrypter\\encrypted\\${name}\\${application.filename} .\\encrypter\\private.pem .\\encrypter\\encrypted\\${name}\\${aes_key.filename}`;
            console.log(cmd_decrypt);

            try {
                await exec_cmd(cmd_decrypt);
            } catch (error) {
                console.error('Error executing decryption command:', error);
                return res.status(500).send({ message: 'Error executing decryption command' });
            }

            setTimeout(async () => {
                try {
                    await FsUtils.mkdir({ path: path.join('./encrypter', 'decrypted', name) });
                    await FsUtils.rename({ oldPath: path.join('./encrypter', 'out.txt'), newPath: path.join('./encrypter', 'encrypted', name, 'out.txt') });
                    console.log('Decrypting...');
                } catch (error) {
                    console.error('Error during file operations:', error);
                }
            }, 3000);

            console.log('sali');

            try {
                await Sender.sendTxt({ file_name: application.filename, file_path: application.path, description, id_user, id_algorithm: 1 });
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