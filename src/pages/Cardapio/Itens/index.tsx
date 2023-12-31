import styles from './Itens.module.scss'
import cardapio from './itens.json'
import Item from './Item'
import { useState } from 'react'
import { useEffect } from 'react'
import { OpcoesOrdenador } from '../Ordenador'

interface Props {
  busca: string,  
  filtro: number | null,
  ordenador: OpcoesOrdenador
}

export default function Itens( { busca, filtro, ordenador}: Props ) {
  const [lista , setLista] = useState(cardapio)
  
  function testaBusca(title: string) {
    const regex = new RegExp(busca, 'i')
    return regex.test(title)
  }

  function testaFiltro(id: number) {
    if(filtro !== null) return filtro === id
    return true
  }

  function ordenar(lista: typeof cardapio) {
    switch(ordenador){
      case 'porcao':
        return lista.sort((a, b) => a.size > b.size ? 1 : -1);
      case 'qtd_pessoas':
        return lista.sort((a, b) => a.serving > b.serving ? 1 : -1);
      case 'preco':
        return lista.sort((a, b) => a.price > b.price ? 1 : -1);
      default:
        return lista
    }
  }

  useEffect(() => {
    const novaLista = cardapio.filter(item => testaBusca(item.title) && testaFiltro(item.category.id))
    setLista(ordenar(novaLista))
  }, [busca, filtro, ordenador])

  return (
    <div className={styles.itens}>
      {lista.map(item => (
        <Item
          {...item}
          key={item.id}
        />
      ))}
    </div>
  )
}
