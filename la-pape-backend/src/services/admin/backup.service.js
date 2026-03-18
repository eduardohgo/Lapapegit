import { exec } from "child_process";
import fs from "fs";
import path from "path";

const backupsDir = path.resolve("backups");

if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

export const createPostgresBackup = async () => {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `backup-${timestamp}.sql`;
    const filePath = path.join(backupsDir, fileName);

    const dbHost = process.env.DB_HOST;
    const dbPort = process.env.DB_PORT || "5432";
    const dbName = process.env.DB_NAME;
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;

    if (!dbHost || !dbName || !dbUser || !dbPassword) {
      return reject(new Error("Faltan variables de entorno de PostgreSQL"));
    }

    const command = `pg_dump -h ${dbHost} -p ${dbPort} -U ${dbUser} -F p -d ${dbName} -f "${filePath}"`;

    exec(
      command,
      {
        env: {
          ...process.env,
          PGPASSWORD: dbPassword,
        },
      },
      (error, stdout, stderr) => {
        if (error) {
          return reject(
            new Error(stderr || error.message || "Error al generar backup")
          );
        }

        resolve({
          fileName,
          filePath,
          message: "Backup generado correctamente",
        });
      }
    );
  });
};