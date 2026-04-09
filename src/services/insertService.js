import db from '../database/db.js'

class InsertService {
  async inserirProduto(produto) {
    await db.run(
      `INSERT INTO produtos (id, product, description) VALUES (?, ?, ?)`,
      [produto.id, produto.product, produto.description],
    )
  }

  async inserirTag(tag) {
    await db.run(`INSERT INTO tags (id, tag) VALUES (?, ?)`, [tag.id, tag.tag])
  }

  async inserirEstoque(item) {
    await db.run(
      `INSERT INTO estoque (id, idProduct, idTag, categoria, preco, quantidade)
   VALUES (?, ?, ?, ?, ?, ?)`,
      [
        item.id,
        item.idProduct,
        item.idTag,
        item.categoria,
        item.preco,
        item.quantidade,
      ],
    )
  }
}

export default new InsertService()
