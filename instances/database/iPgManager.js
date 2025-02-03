// import db_config from '../../config/db-config.json' assert { type: "json" }; // JSON
// import querys from '../../config/querys.json' assert { type: "json" }; // JSON

import { PgHandler } from "../../database/pgManager.js";
import { FsUtils } from "../../utils/fsUtils.js";

const db_config = await FsUtils.readJsonFile('./config/db-config.json');
const querys = await FsUtils.readJsonFile('./config/querys.json');




console.log(querys)
console.log(db_config)

export const appSeguridadInfDB = new PgHandler({config: db_config, querys});

