import { PgHandler } from "../../database/pgManager.js";
import db_config from '../../config/db-config.json' assert { type: "json" }; // JSON
import querys from '../../config/querys.json' assert { type: "json" }; // JSON

console.log(querys)

export const appSeguridadInfDB = new PgHandler({config: db_config, querys});

