import { useState, useEffect } from 'react';
import {
  Table
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const InstituicaoEnsino = () => {
  // let [instituicoesEnsino, setInstituicoesEnsino] = useState([
  //   { nome: 'IFPB - Guarabira' },
  //   { nome: 'IFPB - Cajazeiras' },
  // ]);

  // const buscarHandleClick = (event) => {};

  // const handleClickAdicionarIE = (event) => {
  //   console.log('Adicionando uma IE');
  //   let instituicaoEnsino = { nome: 'IFPB - Campina Grande' };
  //   // instituicoesEnsino.push(instituicaoEnsino);
  //   setInstituicoesEnsino([...instituicoesEnsino, instituicaoEnsino]);
  // };
  // return (
  //   <>
  //     <Row className="pt-4">
  //       <Col xs="10" lg="10">
  //         <Form.Control type="text" placeholder="Busca" />
  //       </Col>
  //       <Col xs="2" lg="2" className="d-flex gap-2">
  //         <OverlayTrigger placement="top" overlay={<Tooltip>Buscar</Tooltip>}>
  //           <Button onClick={buscarHandleClick}>
  //             <FaMagnifyingGlass />
  //           </Button>
  //         </OverlayTrigger>
  //         <OverlayTrigger
  //           placement="top"
  //           overlay={<Tooltip>Adicionar</Tooltip>}
  //         >
  //           <Button onClick={handleClickAdicionarIE}>
  //             <FaPlus />
  //           </Button>
  //         </OverlayTrigger>
  //       </Col>
  //     </Row>

  //     <Table striped bordered hover>
  //       <thead>
  //         <tr>
  //           <th>#</th>
  //           <th>Nome</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {instituicoesEnsino.map((instituicaoEnsino, i) => {
  //           return (
  //             <tr key={i}>
  //               <td>{i + 1}</td>
  //               <td>{instituicaoEnsino.nome}</td>
  //             </tr>
  //           );
  //         })}
  //       </tbody>
  //     </Table>
  //   </>
  // );

 const [instituicoes, setInstituicoes] = useState([]);

    useEffect(() => {
        fetch('/instituicoes_pb_2025.json')
            .then(resposta => resposta.json())
            .then(dados => {
                const maiores = dados
                    .filter(item => item.qt_mat_bas !== null)
                    .sort((a, b) => b.qt_mat_bas - a.qt_mat_bas)
                    .slice(0, 10);

                setInstituicoes(maiores);
            })
            .catch(erro => console.log('deu erro paizao, conserta ai', erro));
    }, []);

    return (
        <div>
            <h2 className="mt-4 mb-3">
                Top 10 Maiores Matrículas das Instuiçoes da Paraíba
            </h2>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Posiçao</th>
                        <th>Instituiçao</th>
                        <th>Municipio</th>
                        <th>Matriculas</th>
                    </tr>
                </thead>

                <tbody>
                    {instituicoes.map((item, index) => (
                        <tr key={item.co_entidade}>
                            <td>{index + 1}º</td>
                            <td>{item.no_entidade}</td>
                            <td>{item.no_municipio}</td>
                            <td>
                                {item.qt_mat_bas.toLocaleString('pt-BR')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default InstituicaoEnsino;