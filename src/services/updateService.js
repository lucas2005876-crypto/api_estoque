import db from '../database/db.js'

class UpdateService {
  async atualizarProduto(id, dados) {
    await db.run(
      `UPDATE produtos SET product = ?, description = ? WHERE id = ?`,
      [dados.product, dados.description, id],
    )
  }

  async atualizarTag(id, dados) {
    await db.run(`UPDATE tags SET tag = ? WHERE id = ?`, [dados.tag, id])
  }

  async atualizarEstoque(id, dados) {
    await db.run(
      `UPDATE estoque 
       SET idProduct = ?, idTag = ?, categoria = ?, preco = ?, quantidade = ?
       WHERE id = ?`,
      [
        dados.idProduct,
        dados.idTag,
        dados.categoria,
        dados.preco,
        dados.quantidade,
        id,
      ],
    )
  }
}

export default new UpdateService()
