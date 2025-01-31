import { appSeguridadInfDB } from "../instances/database/iPgManager.js";

const a = await appSeguridadInfDB.exeQuery({key: 'getApplicationAdmins'})

console.log(a)