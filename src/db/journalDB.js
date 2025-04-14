import Dexie from "dexie";

const journalDB = new Dexie("MindVaultDB");

journalDB.version(1).stores({
  notes: "++id, content, timestamp",
});

export default journalDB;
