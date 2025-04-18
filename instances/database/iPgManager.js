// import db_config from '../../config/db-config.json' assert { type: "json" }; // JSON
// import querys from '../../config/querys.json' assert { type: "json" }; // JSON

import { PgHandler } from "../../database/pgManager.js";
import { FsUtils } from "../../utils/fsUtils.js";

const db_config = await FsUtils.readJsonFile('./config/db-config.json');
const querys = await FsUtils.readJsonFile('./config/querys.json');
const deployed_db = await FsUtils.readJsonFile('./config/deployed-configDB.json');



console.log(querys)
console.log(deployed_db)

export const appSeguridadInfDB = new PgHandler({config: deployed_db, querys});

