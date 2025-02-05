import { exec } from 'child_process';


export async function exec_cmd(cmd) {
  try {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  } catch (error) {
    console.error(error)
  }
}
console.log('Ejecutando comando...');
exec_cmd('node -v');