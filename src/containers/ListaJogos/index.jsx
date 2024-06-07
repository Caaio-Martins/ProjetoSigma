import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ContainerCarrinho, Container } from './style';
import apiCliente from '../../services/apiCliente';
import CardListaJogos from '../../components/Cards/CardListaJogos';
import { useSearch } from '../../context/searchCoxtexto';

const ListaJogos = () => {
  const [jogos, setJogos] = useState([]);
  const [filteredJogos, setFilteredJogos] = useState([]);
  const { globalSearchTerm } = useSearch(); // Obtendo o termo de pesquisa global do contexto

  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const response = await apiCliente.get('/api/Jogo');
        console.log('Dados recebidos do backend:', response.data);
        const jogosAtivos = response.data.filter(jogo => jogo.ativo);
        setJogos(jogosAtivos);
        setFilteredJogos(jogosAtivos);
      } catch (error) {
        console.error('Erro ao buscar jogos:', error);
      }
    };
    fetchJogos();
  }, []);

  useEffect(() => {
    if (!globalSearchTerm) {
      setFilteredJogos(jogos);
      return;
    }
    const filtered = jogos.filter(jogo =>
      jogo.nomeJogo.toLowerCase().includes(globalSearchTerm.toLowerCase())
    );
    setFilteredJogos(filtered);
  }, [globalSearchTerm, jogos]);

  return (
    <Container>
      <h2>Lista de Jogos</h2>
      <ContainerCarrinho>
        <ul>
          <NavLink to="/cadastro-jogos">Adicionar</NavLink>
          {filteredJogos.map((jogo) => (
            <CardListaJogos
              key={jogo.idJogo}
              jogo={jogo}
            />
          ))}
        </ul>
      </ContainerCarrinho>
    </Container>
  );
};

export default ListaJogos;