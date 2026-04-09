import express from 'express'
import controller from '../controllers/estoqueController.js'

const router = express.Router()

router.get('/estoque', controller.listarEstoque)

router.get('/estoque/valorTotal', controller.valorEstoque)
router.get('/estoque/valorMedio', controller.valorMedio)
router.get('/estoque/quantidade', controller.quantidadetotal)

router.get('/estoque/:id', controller.buscarEstoquePorId)
router.post('/estoque', controller.adicionarEstoque)
router.delete('/estoque/:id', controller.deletarEstoque)
router.put('/estoque/:id', controller.atualizarEstoque)

// PRODUTOS

router.get('/produtos', controller.listarProdutos)
router.get('/produtos/:id', controller.buscarProdutoPorId)
router.post('/produtos', controller.adicionarProduto)
router.delete('/produtos/:id', controller.deletarProduto)
router.put('/produtos/:id', controller.atualizarProduto)

// TAGS

router.get('/tags', controller.listarTags)
router.get('/tags/:id', controller.buscarTagPorId)
router.post('/tags', controller.adicionarTags)
router.delete('/tags/:id', controller.deletarTag)
router.put('/tags/:id', controller.atualizarTag)

export default router
