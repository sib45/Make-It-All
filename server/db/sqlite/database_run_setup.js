//Dummy database is run using SQLite and MySQL, actual database will use MySQL
//Testing will be done on MySQL on university servers
//SQLite was chosen since it is similar enough to MySQL and
//easy to set up for prototyping

import sqlite3 from "sqlite3";
import {
  createTablesScript,
  InsertValuesScript,
  DropTablesScript,
} from "./database_scripts.js";

//Function that runs the DDL script (Reads from a JS function returning the DDL string)
const runDDLScript = async function () {
  const db = new sqlite3.Database("./server/db/sqlite/data.db");

  try {
    //Executes the DDL script chosen (or all if uncommented)
    await db.exec(DropTablesScript());
    await db.exec(createTablesScript());
    await db.exec(InsertValuesScript());
  } catch (error) {
    console.error("Error running DDL script:", error);
  } finally {
    db.close();
  }
};

runDDLScript();
