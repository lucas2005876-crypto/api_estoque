import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// abre conexão com o banco
const db = await open({
  filename: './database.db',
  driver: sqlite3.Database,
})

await db.exec(`
  CREATE TABLE IF NOT EXISTS estoque (
    id INTEGER PRIMARY KEY,
    idProduct INTEGER,
    idTag INTEGER,
    categoria TEXT,
    preco REAL,
    quantidade INTEGER
  )
`)
await db.exec(`
     CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY,
    product TEXT,
    description TEXT
 )
`)
await db.exec(`
      CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag TEXT
  )
    `)

export default db
