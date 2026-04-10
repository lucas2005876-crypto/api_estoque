import db from '../database/db.js'

class DeleteService {
  async deletarProduto(id) {
    await db.run(`DELETE FROM produtos WHERE id = ?`, [id])
  }

  async deletarTag(id) {
    await db.run(`DELETE FROM tags WHERE id = ?`, [id])
  }

  async deletarEstoque(id) {
    await db.run(`DELETE FROM estoque WHERE id = ?`, [id])
  }
}

export default new DeleteService()
