import * as child from "child_process";
import * as formatDate from "dateformat";
// mongorestore --host hostname.com --port 27017 --username user --password pass mongodump/db/
import {
  MONGO_DB,
  MONGO_HOST,
  MONGO_PASS,
  MONGO_PORT,
  MONGO_USER
} from "@environments";

enum fileType {
  JSON,
  CSV,
  TSV
}

const collection = "users";
const now = formatDate(new Date(), "yyyy/mm/dd") || new Date().toISOString();
const out = `./backup/${now}/${collection}.json`;

// mongoexport
export const dump: child.ChildProcess = child.exec(
  `mongoexport -h ${MONGO_HOST}:${MONGO_PORT} -d ${MONGO_DB} -c ${collection} -u ${MONGO_USER} -p ${MONGO_PASS} -o ${out}`,
  () => {
    console.log(`Success.`);
  }
);
