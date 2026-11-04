import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Carrossel from '../components/Carrossel';

const Home = () => {

  console.log("Home está sendo renderizado!");
  let itensCarrossel = [
    {
      srcImagem:
        '/imagens/imagem1.jpg',
      titulo: 'Nossas Salas de aula',
      descricao:
        'Nos Institutos Federais você tem uma infraestrutura de laboratórios confortáveis.',
    },
    {
      srcImagem:
        '/imagens/imagem2.png',
      titulo: 'Professores qualificados',
      descricao: 'Professores com pós-graduação.',
    },
  ];
  return (
    <>
      {/* Carrossel */}
      <Carrossel itensCarrossel={itensCarrossel}></Carrossel>
      {/* Cards */}
      <Container className="mt-2">
        <Row>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              />
              <Card.Body>
                <Card.Title>Ensino para Todas as Idades</Card.Title>
                <Card.Text>
                  legal
                </Card.Text>
                <Button variant="primary">nao clique</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1778489769184-45868633c527?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              />
              <Card.Body>
                <Card.Title>Computadores de Última Geraçao</Card.Title>
                <Card.Text>
                  esqueça a imagem do carrossel
                </Card.Text>
                <Button variant="primary">jarvis clique no botao</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="https://plus.unsplash.com/premium_photo-1661688307556-61310f23a42c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              />
              <Card.Body>
                <Card.Title>Educaçao Financeira</Card.Title>
                <Card.Text>
                  vai sair podendo ter o novo carro tesla voador
                </Card.Text>
                <Button variant="primary">confia</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;