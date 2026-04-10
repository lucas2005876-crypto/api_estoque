import Estoque from '../modelos/Estoque.js'
import insertService from '../services/insertService.js'
import updateService from '../services/updateService.js'
import deleteService from '../services/deleteService.js'
import db from '../database/db.js'

class AppController {
  constructor() {
    this.cEstoque = new Estoque()

    this.estoque = [{}]

    this.produtos = [{}]

    this.tags = [{}]
  }

  carregarDados = async () => {
    try {
      const produtos = await db.all('SELECT * FROM produtos')
      const tags = await db.all('SELECT * FROM tags')
      const estoque = await db.all('SELECT * FROM estoque')

      this.produtos = produtos
      this.tags = tags
      this.estoque = estoque

      console.log('Dados carregados do banco')
    } catch (error) {
      console.log('Erro ao carregar:', error.message)
    }
  }

  // ===== ESTOQUE

  listarEstoque = (req, res) => {
    res.status(200).json(this.estoque)
  }

  buscarEstoquePorId = (req, res) => {
    const index = this.cEstoque.procurarIndex(this.estoque, req.params.id)

    if (index === -1) {
      return res.status(404).json({ erro: 'Produto não encontrado' })
    }

    res.status(200).json(this.estoque[index])
  }

  adicionarEstoque = async (req, res) => {
    try {
      const novoProduto = req.body

      const novoId = Math.max(...this.estoque.map((p) => p.id), 0) + 1

      novoProduto.id = novoId

      this.estoque = this.cEstoque.adicionarEstoque(novoProduto, this.estoque)

      await insertService.inserirEstoque(novoProduto)

      res.status(201).json({
        mensagem: 'Produto adicionado com sucesso',
      })
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      })
    }
  }

  atualizarEstoque = async (req, res) => {
    try {
      const id = req.params.id
      const novosDados = req.body

      const index = this.cEstoque.procurarIndex(this.estoque, id)

      if (index === -1) {
        return res.status(404).json({
          erro: 'Produto não encontrado',
        })
      }
      novosDados.id = this.estoque[index].id

      this.estoque[index] = {
        ...this.estoque[index],
        ...req.body,
        id: this.estoque[index].id,
      }

      await updateService.atualizarEstoque(id, this.estoque[index])

      res.status(200).json({
        mensagem: 'Estoque atualizado com sucesso',
      })
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      })
    }
  }

  deletarEstoque = async (req, res) => {
    const id = req.params.id
    const index = this.cEstoque.procurarIndex(this.estoque, req.params.id)

    if (index === -1) {
      return res.status(404).json({ erro: 'Produto não encontrado' })
    }

    await deleteService.deletarEstoque(id)

    this.estoque.splice(index, 1)
    res.status(200).send('Estoque apagado')
  }

  valorEstoque = (req, res) => {
    valor = this.cEstoque.valorTotalEstoque(this.estoque)
    res.status(200).json({ valorTotal: valor })
  }

  valorMedio = (req, res) => {
    valor = this.cEstoque.mediaPreco(this.estoque)
    res.status(200).json({ valorMedio: valor })
  }

  quantidadetotal = (req, res) => {
    quantidadeProdutos = this.cEstoque.totalProdutos(this.estoque)
    res.status(200).json({ quantidade: quantidadeProdutos })
  }

  filtarProtudos = (req, res) => {
    quantidadeProdutos = this.cEstoque.totalProdutos(this.estoque)
    res.status(200).json({ quantidade: quantidadeProdutos })
  }

  // ===== PRODUTOS

  listarProdutos = (req, res) => {
    res.status(200).json(this.produtos)
  }

  buscarProdutoPorId = (req, res) => {
    const index = this.cEstoque.procurarIndex(this.produtos, req.params.id)

    if (index === -1) {
      return res.status(404).json({ erro: 'Produto não encontrado' })
    }

    res.status(200).json(this.produtos[index])
  }

  adicionarProduto = async (req, res) => {
    try {
      const novoProduto = req.body

      const novoId = Math.max(...this.produtos.map((p) => p.id), 0) + 1

      novoProduto.id = novoId

      this.produtos = this.cEstoque.adicionarProduto(novoProduto, this.produtos)

      await insertService.inserirProduto(novoProduto)

      res.status(201).json({
        mensagem: 'Produto adicionado com sucesso',
      })
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      })
    }
  }

  atualizarProduto = async (req, res) => {
    try {
      const id = req.params.id
      const novosDados = req.body

      const index = this.cEstoque.procurarIndex(this.produtos, id)

      if (index === -1) {
        return res.status(404).json({
          erro: 'Produto não encontrado',
        })
      }
      novosDados.id = this.produtos[index].id

      this.produtos[index] = {
        ...this.produtos[index],
        ...req.body,
        id: this.produtos[index].id,
      }

      await updateService.atualizarProduto(id, this.produtos[index])

      res.status(200).json({
        mensagem: 'Produto atualizado com sucesso',
      })
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      })
    }
  }

  deletarProduto = async (req, res) => {
    const id = req.params.id
    const index = this.cEstoque.procurarIndex(this.produtos, req.params.id)

    if (index === -1) {
      return res.status(404).json({ erro: 'Produto não encontrado' })
    }

    this.produtos.splice(index, 1)

    await deleteService.deletarProduto(id)

    res.status(200).send('Produto apagado')
  }

  // ===== TAGS

  listarTags = (req, res) => {
    res.status(200).json(this.tags)
  }

  buscarTagPorId = (req, res) => {
    const index = this.cEstoque.procurarIndex(this.tags, req.params.id)

    if (index === -1) {
      return res.status(404).json({ erro: 'Tags não encontradas' })
    }

    res.status(200).json(this.tags[index])
  }

  adicionarTags = async (req, res) => {
    try {
      const novaTag = req.body

      const novoId = Math.max(...this.tags.map((p) => p.id), 0) + 1

      novaTag.id = novoId

      this.tags = this.cEstoque.adicionarTag(novaTag, this.tags)

      await insertService.inserirTag(novaTag)

      res.status(201).json({
        mensagem: 'Tag adicionada com sucesso',
      })
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      })
    }
  }

  atualizarTag = async (req, res) => {
    try {
      const id = req.params.id
      const novosDados = req.body

      const index = this.cEstoque.procurarIndex(this.tags, id)

      if (index === -1) {
        return res.status(404).json({
          erro: 'Produto não encontrado',
        })
      }
      novosDados.id = this.tags[index].id

      this.tags[index] = {
        ...this.tags[index],
        ...req.body,
        id: this.tags[index].id,
      }

      await updateService.atualizarTag(id, this.tags[index])

      res.status(200).json({
        mensagem: 'Tag atualizada com sucesso',
      })
    } catch (error) {
      res.status(400).json({
        erro: error.message,
      })
    }
  }

  deletarTag = async (req, res) => {
    const id = req.params.id

    const index = this.cEstoque.procurarIndex(this.tags, req.params.id)

    if (index === -1) {
      return res.status(404).json({ erro: 'Tag não encontrado' })
    }

    this.tags.splice(index, 1)

    await deleteService.deletarTag(id)
    res.status(200).send('Tag apagada')
  }
}

export default new AppController()
