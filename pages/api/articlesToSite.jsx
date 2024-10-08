import pool from '../../utils/db';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handleInsert(req, res);
  } else if (req.method === 'GET') {
    await handleGet(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function handleGet(req, res) {
  const { id, page = 1 } = req.query;

  try {
    const client = await pool.connect();
    try {
      const currentBrazilTime = moment()
        .tz('America/Sao_Paulo')
        .format('YYYY-MM-DD HH:mm:ss+00');
      console.log('Current Brazil Time:', currentBrazilTime);

      let queryText;
      const queryValues = [currentBrazilTime];
      if (id) {
        queryText = 'SELECT * FROM articles WHERE id = $1'; // Alterar a consulta para pegar apenas o artigo pelo ID
        queryValues[0] = parseInt(id, 10); // Atualizar o valor da consulta
      } else {
        queryText =
          'SELECT * FROM articles WHERE publicated_date < $1 AND is_visible = true AND site_article = 1';
        
        const limit = 10;
        const offset = (page - 1) * limit;
        queryText += ` ORDER BY publicated_date DESC LIMIT $2 OFFSET $3`;
        queryValues.push(limit, offset);
      }

      console.log('Executing query:', queryText, 'with values:', queryValues);

      const result = await client.query(queryText, queryValues);

      const totalPages = Math.ceil(result.rowCount / 10); // Usar rowCount para o cálculo de páginas
      const response = {
        articles: result.rows,
        totalPages: totalPages,
        currentPage: parseInt(page, 10),
      };

      console.log('Query result:', response);

      res.status(200).json(response);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: error.message || 'Unknown error' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
}