import { pool } from "../db.js";

export const getPong = (req, res) => {
  res.send("pong");
};

export const getAllUrls = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM urls");

  res.json(rows);
};

export const getUrl = async (req, res) => {
  const { short_url } = req.params;
  const { rows } = await pool.query("SELECT * FROM urls WHERE short_url = $1", [
    short_url,
  ]);
  return res.json(rows[0]);
};

export const getRedirectUrl = async (req, res) => {
  const { short_url } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM urls WHERE short_url = $1",
      [short_url]
    );
    if (rows.length > 0) {
      const originalUrl = rows[0].original_url;
      return res.redirect(originalUrl);
    } else {
      return res.status(404).send("URL corta no encontrada");
    }
  } catch (error) {
    console.error("Error al obtener la URL desde la base de datos:", error);
    return res.status(500).send("Error interno del servidor");
  }
};

export const createShortUrl = async (req, res) => {
  const newUrl = req.body;
  try {
    const shortUrl = Math.random().toString(36).substring(2, 5);

    console.log(shortUrl);

    const { rows } = await pool.query(
      "INSERT INTO urls (original_url,short_url) VALUES ($1,$2) RETURNING *",
      [newUrl.original_url, shortUrl]
    );

    return res.json(rows[0]);
  } catch (error) {
    console.error("Error al insertar en la base de datos:", error);
    return res.status(500).send("Error interno del servidor");
  }
};

export const deleteUrl = async (req, res) => {
  const { short_url } = req.params;
  try {
    const { rows } = await pool.query(
      "DELETE FROM urls WHERE short_url = $1 RETURNING *",
      [short_url]
    );
    return res.json(rows[0]);
  } catch (error) {
    console.error("Error al eliminar en la base de datos:", error);
    return res.status(500).send("Error interno del servidor");
  }
};

export const updateUrl = async (req, res) => {
  const { short_url } = req.params;
  const newUrl = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE urls SET short_url = $1 WHERE short_url = $2 RETURNING *",
      [newUrl.short_url, short_url]
    );
    return res.json(rows[0]);
  } catch (error) {
    console.error("Error al actualizar en la base de datos:", error);
    return res.status(500).send("Error interno del servidor");
  }
};
