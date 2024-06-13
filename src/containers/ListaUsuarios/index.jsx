import React from 'react';
import { NavLink } from 'react-router-dom';
import CardListaUsuarios from '../../components/Cards/CardListaUsuarios';
import { ContainerCarrinho, Container, ContainerBotao } from './style';
import { useSearch } from '../../context/searchCoxtexto';

function ListaUsuarios() {
  const { globalSearchTerm } = useSearch();

  return (
    <Container>
      <h2>Lista de Usuarios</h2>
      <ContainerCarrinho>
        <ContainerBotao>
          <NavLink className='adicionar' to="/cadastro-usuarios">Adicionar</NavLink>
        </ContainerBotao>
        <CardListaUsuarios searchTerm={globalSearchTerm} />
      </ContainerCarrinho>
    </Container>
  );
}

export default ListaUsuarios;