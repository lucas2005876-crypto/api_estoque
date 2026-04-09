class Estoque {
  procurarIndex(lista, id) {
    return lista.findIndex((element) => {
      return element.id === Number(id)
    })
  }

  adicionarEstoque(item, lista) {
    lista.push(item)
    return lista
  }

  adicionarProduto(produto, lista) {
    const existe = lista.some((el) => el.product === produto.product)

    if (existe) {
      throw new Error('Produto já existe')
    }

    lista.push(produto)
    return lista
  }

  adicionarTag(tag, lista) {
    const existe = lista.some((el) => el.tag === tag.tag)

    if (existe) {
      throw new Error('Tag já existe')
    }

    lista.push(tag)
    return lista
  }

  filtrar(estoque, categoria = null, precoMinimo = null, precoMaximo = null) {
    let estoqueFiltrado = [...estoque]

    if (categoria) {
      estoqueFiltrado = estoqueFiltrado.filter(
        (item) => item.categoria === categoria,
      )
    }

    if (precoMinimo !== null) {
      estoqueFiltrado = estoqueFiltrado.filter(
        (item) => item.preco >= precoMinimo,
      )
    }

    if (precoMaximo !== null) {
      estoqueFiltrado = estoqueFiltrado.filter(
        (item) => item.preco <= precoMaximo,
      )
    }

    return estoqueFiltrado
  }

  valorEstoque(estoque) {
    let valorEstoque = 0

    estoque.forEach((element) => {
      valorEstoque += element.preco * element.quantidade
    })

    return valorEstoque
  }

  totalProdutos(estoque) {
    let contagemProdutos = 0

    estoque.forEach((element) => {
      contagemProdutos += element.quantidade
    })

    return contagemProdutos
  }

  mediaPreco(estoque) {
    let valorTotal = 0
    let quantidade = 0

    estoque.forEach((element) => {
      valorTotal += element.preco
      quantidade++
    })

    const media = valorTotal / quantidade

    return media
  }

  ordenarPrecoDecrescente(estoque) {
    return estoque.sort((a, b) => a.preco - b.preco)
  }

  descontoPorPrecoMinimo(estoque, precoMinimo, desconto) {
    if (desconto < 0 || desconto > 1) {
      throw new Error('Desconto deve ser entre 0 e 1')
    }

    let produtosDesconto = this.filtrar(estoque, null, precoMinimo).map(
      (item) => ({ ...item }),
    )

    produtosDesconto.forEach((element) => {
      element.preco -= element.preco * desconto
    })

    return produtosDesconto
  }
}

export default Estoque
