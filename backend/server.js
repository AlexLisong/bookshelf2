import express from 'express';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// ── serve frontend static files ──────────────────────
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ── API routes ───────────────────────────────────────
app.get('/api/books', async (_req, res) => {
  try {
    const data = await readFile(path.join(__dirname, 'books.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch {
    res.status(500).json({ error: 'failed to load books' });
  }
});

// ── start server ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`bookshelf2 running at http://localhost:${PORT}`);
});
