import { createPostgresBackup } from "../../services/admin/backup.service.js";

export const createBackup = async (req, res) => {
  try {
    const result = await createPostgresBackup();

    return res.status(200).json({
      ok: true,
      message: "Copia de seguridad generada correctamente",
      backup: result,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error al generar la copia de seguridad",
      error: error.message,
    });
  }
};