import app from './src/app.js'
import controller from './src/controllers/estoqueController.js'

await controller.carregarDados()

const PORT = 3000

app.listen(PORT, () => {
  console.log('Servidor rodando')
})
