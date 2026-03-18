export const adminHome = async (req, res) => {
  try {
    return res.status(200).json({
      ok: true,
      message: "Módulo administrador funcionando correctamente",
      user: req.user || null,
      sections: [
        "backups",
        "automation",
        "import-export",
        "security",
        "monitoring"
      ]
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: "Error en el módulo administrador",
      error: error.message
    });
  }
};