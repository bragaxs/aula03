import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import Loading from '../pages/Loading'


export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const receberListaProdutos = async () => {
      try {
        const api = await fetch('https://fakestoreapi.com/products');
        const format = await api.json();
        setProdutos(format);
      } catch (erro) {
        console.error("Ocorreu um erro");
      }
    };

    receberListaProdutos();
  }, []);

 const ordernarAZ = () => {
  const listaOrdenada = [...produtos].sort((a, b) => a.title.localeCompare(b.title))
  setProdutos(listaOrdenada)
 }
 
 const ordernarZA = () => {
  const listaOrdenada = [...produtos].sort((a, b) => b.title.localeCompare(a.title));
  setProdutos(listaOrdenada);
}

const ordernarPreco = () => {
  const listaOrdenada = [...produtos].sort((a, b) => a.price - b.price);
  setProdutos(listaOrdenada);
}

const ordernarmaiormenor = () => {
  const listaOrdenada = [...produtos].sort((a, b) => b.price - a.price);
  setProdutos(listaOrdenada);
}


 if (produtos.length===0) {
  return <Loading />;
 } 
 

  return (
    <>
      <div className={styles.buttonContainer}>
      <button className={styles.sortButton} onClick={() => ordernarAZ()}> AZ </button>
      <button className={styles.sortButton} onClick={() => ordernarZA()}> ZA </button>
      <button className={styles.sortButton} onClick={ordernarPreco}>Ordenar por Preço (Menor para Maior)</button>
      <button className={styles.sortButton} onClick={ordernarmaiormenor}>Ordenar por Preço (Maior para Menor)</button>
      </div>
      
      <h1 className={styles.title}>Lista de Produtos</h1>
      <div className={styles.produtoContainer}>
        {produtos.map(produto => (
          <div key={produto.id} className={styles.produtoItem}>
            <h2 className={styles.teste}>{produto.title}</h2>
            <p className={styles.description}>{produto.description}</p>
            <p className={styles.teste}>Preço: R${produto.price}</p>
            <img src={produto.image} alt={produto.title} className={styles.img} />
          </div>
        ))}
      </div>
    </>
  );
}
