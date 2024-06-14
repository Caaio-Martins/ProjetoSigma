import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ContainerCarrinho, Container, ContainerBotao } from './style';
import CardListaProdutos from '../../components/Cards/CardListaProdutos';
import { useSearch } from '../../context/searchCoxtexto';
import CardCabecalhoProduto from '../../components/Cards/CardCabecalhoProduto';

function ListaProdutos() {
  const { globalSearchTerm } = useSearch();

  return (
    <Container>
      <h2>Lista de Produtos</h2>
      <ContainerCarrinho>
        <ContainerBotao>
        <NavLink className='adicionar' to="/cadastro-produtos">Adicionar</NavLink>
        </ContainerBotao>
        <CardCabecalhoProduto />
            <CardListaProdutos searchTerm={globalSearchTerm}
            />
      </ContainerCarrinho>
    </Container>
  );
};

export default ListaProdutos;
