import React, { useState } from "react";
import {
  Campos,
  Colunas,
  Container,
  ContainerColunas,
  Form,
  Input,
  TituloCadastro,
  CamposMenores,
  CamposMenoresSubdivisao2,
} from "./style";
import BCadastrar from "../../components/Button/Cadastrar";
import apiCliente from "../../services/apiCliente";

function CadastroEndereco() {
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [pais, setPais] = useState("");
  const [ativo, setAtivo] = useState(true); // Defina o estado para ativo como true

  const handleSignup = async (event) => {
    event.preventDefault();

    console.log({
      cep,
      rua,
      numero,
      bairro,
      cidade,
      uf,
      pais,
      ativo,
    });
    try {
      // Envia os dados do endereço para o backend usando a instância apiCliente
      await apiCliente.post("/api/endereco", {
        cep,
        rua,
        numero,
        bairro,
        cidade,
        uf,
        pais,
        ativo,
      });

      alert("Endereço cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar endereço: ", error);
      alert(error.message);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSignup}>
        <TituloCadastro>Cadastro de Endereço</TituloCadastro>
        <ContainerColunas>
          <Colunas>
            <CamposMenores>
              <CamposMenoresSubdivisao2>
                <label>CEP</label>
                <Input
                  type="text"
                  placeholder="CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  required
                />
              </CamposMenoresSubdivisao2>
              <CamposMenoresSubdivisao2>
                <label>Rua</label>
                <Input
                  type="text"
                  placeholder="Rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  required
                />
              </CamposMenoresSubdivisao2>
            </CamposMenores>
            <CamposMenores>
              <CamposMenoresSubdivisao2>
                <label>Número</label>
                <Input
                  type="text"
                  placeholder="Número"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
                />
              </CamposMenoresSubdivisao2>
              <CamposMenoresSubdivisao2>
                <label>Bairro</label>
                <Input
                  type="text"
                  placeholder="Bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                />
              </CamposMenoresSubdivisao2>
              <CamposMenoresSubdivisao2>
                <label>Cidade</label>
                <Input
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </CamposMenoresSubdivisao2>
              <CamposMenoresSubdivisao2>
                <label>UF</label>
                <Input
                  type="text"
                  placeholder="UF"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  required
                />
              </CamposMenoresSubdivisao2>
              <CamposMenoresSubdivisao2>
                <label>País</label>
                <Input
                  type="text"
                  placeholder="País"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  required
                />
              </CamposMenoresSubdivisao2>
            </CamposMenores>
          </Colunas>
        </ContainerColunas>

        <BCadastrar />
      </Form>
    </Container>
  );
}

export default CadastroEndereco;
