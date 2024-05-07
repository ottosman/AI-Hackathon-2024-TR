import * as SQLite from 'expo-sqlite';

const databaseName = 'traffic.db';

let db: SQLite.SQLiteDatabase | null = null; // Declare db as nullable SQLiteDatabase

const getOpenDatabase = async () => {
    if (!db) {
      db = await SQLite.openDatabase(databaseName);
    }
    return db;
};

const createDatabase = async () => {
  const db = await getOpenDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS traffic_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vehicle_count INTEGER,
            time TEXT
          );
        `
      );
    },
    (error) => {
    },
    () => {
    }
  );
};

const fetchAllData = async () => {
    try {
        const db = await getOpenDatabase();
        return new Promise((resolve, reject) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        `
                        SELECT * FROM traffic_data;
                        `,
                        [],
                        (_, { rows }) => {
                            resolve(rows._array);
                        },
                        (_, error) => {
                            reject(error);
                            return false;
                        }
                    );
                },
                (error) => {
                }
            );
        });
    } catch (error) {
    }
};

const fetchLastFourData = async () => {
    try {
        const db = await getOpenDatabase();
        return new Promise((resolve, reject) => {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        `
                        SELECT * FROM traffic_data ORDER BY id DESC LIMIT 4;
                        `,
                        [],
                        (_, { rows }) => {
                            resolve(rows._array);
                        },
                        (_, error) => {
                            reject(error);
                            return false;
                        }
                    );
                },
                (error) => {
                }
            );
        });
    } catch (error) {
    }
};

const saveDataToDatabase = async (vehicleCount: number, time: string) => {
    try {
      const db = await getOpenDatabase();
      db.transaction(
        (tx) => {
          tx.executeSql(
            `
            INSERT INTO traffic_data (vehicle_count, time) VALUES (?, ?)
            `,
            [vehicleCount, time]
          );
        },
        (error) => {
        },
        () => {
        }
      );
    } catch (error) {
      throw error; // Hata yönetimi için hatayı yeniden fırlat
    }
  };


export { db, createDatabase, fetchAllData, fetchLastFourData, saveDataToDatabase };
