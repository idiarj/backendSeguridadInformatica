import { promises as fs } from 'fs';

export class FsUtils {

    static async readFile(filePath) {
        try {
            console.log('Leyendo el archivo:', filePath);
            return await fs.readFile(filePath);
        }catch (error) {
            console.log('Error al leer el archivo:', error);
        }
    }

    static async readJsonFile(filePath) {
        try {
            console.log('Leyendo el archivo:', filePath);
            const data = await fs.readFile(filePath);
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al leer el json:', error);
        }
    }

    static async writeFile(filePath, data) {
        try {
            await fs.writeFile(filePath, data);
        } catch (error) {
            console.log('Error al escribir el archivo:', error);
        }
    }

    static async deleteFile(filePath) {
        try {
            await fs.unlink(filePath);
            console.log(`Archvivo ${filePath} borrado`);
        } catch (error) {
            console.log('Error al borrar el archivo:', error);
        }
    }

    static async mkdir({path}){
        try {
            await fs.mkdir(path);
        } catch (error) {
            console.log('Error al crear el directorio:', error);
            throw error;
        }
    }

    static async rename({oldPath, newPath}){
        try {
            await fs.rename(oldPath, newPath);
        } catch (error) {
            console.log('Error al renombrar el archivo:', error);
            throw error;
        }
    }
}