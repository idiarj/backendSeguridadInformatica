import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function exec_cmd(cmd) {
  try {
    const { stdout, stderr } = await execPromise(cmd);
    console.log('Salida:', stdout);
    if (stderr) console.error('Error:', stderr);
  } catch (error) {
    console.error('Error al ejecutar:', error);
  }
}
console.log('Ejecutando comando...');
exec_cmd('node -v');