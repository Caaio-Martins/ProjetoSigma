import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ContainerCarrinho, Container } from './style';
import CardListaProdutos from '../../components/Cards/CardListaProdutos';
import { useSearch } from '../../context/searchContext';

function ListaProdutos() {
  const { globalSearchTerm } = useSearch();

  return (
    <Container>
      <h2>Lista de Produtos</h2>
      <ContainerCarrinho>
          <NavLink to="/cadastro-produtos">Adicionar</NavLink>
            <CardListaProdutos searchTerm={globalSearchTerm}
            />
      </ContainerCarrinho>
    </Container>
  );
};

export default ListaProdutos;
