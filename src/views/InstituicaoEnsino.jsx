import { useState, useEffect } from 'react';
import {
  Table,
  Form,
  Button,
  Alert
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const InstituicaoEnsino = () => {


 const [instituicoes, setInstituicoes] = useState([]);

    const [nomeInstituicao, setNomeInstituicao] = useState('');
    const [mensagem, setMensagem] = useState('');

    const [idEditando, setIdEditando] = useState(null);

        const excluirInstituicao = async (id) => {
            const confirmar = window.confirm(
                'Are u sure about that?'
            );

            if (!confirmar) {
                return;
            }

            try {
                const resposta = await fetch(
                    `http://localhost:3000/instituicoes/${id}`,
                    {
                        method: 'DELETE'
                    }
                );

                if (!resposta.ok) {
                    throw new Error('consegui n');
                }

                setInstituicoes(atual =>
                    atual.filter(item => item.id !== id)
                );

                setMensagem('foi de vapo!');

            } catch (erro) {
                console.log(erro);
                setMensagem(erro.message);
            }
        };

        const salvarEdicao = async (e) => {
        e.preventDefault();

        const nome = nomeInstituicao.trim();

        if (!nome) {
            setMensagem('Digite o nome da instituiçao.');
            return;
        }

        try {
            const resposta = await fetch(
                `http://localhost:3000/instituicoes/${idEditando}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        no_entidade: nome
                    })
                }
            );

            const dadosResposta = await resposta.json();

            if (!resposta.ok) {
                throw new Error('Erro ao editar instituiçao.');
            }

            setInstituicoes(atual =>
                atual.map(item =>
                    item.id === idEditando
                        ? { ...item, ...dadosResposta }
                        : item
                )
            );

            setMensagem('Instituiçao atualizada com sucesso!');
            setNomeInstituicao('');
            setIdEditando(null);

        } catch (erro) {
            setMensagem(erro.message);
        }
    };

    const cadastrarInstituicao = async (e) => {
    e.preventDefault();

    const nome = nomeInstituicao.trim();

    if (!nome) {
        setMensagem('Digite o nome da instituição.');
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3000/instituicoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                no_entidade: nome
            })
        });

        const dadosResposta = await resposta.json();

        console.log('Status:', resposta.status);
        console.log('Resposta do servidor:', dadosResposta);

        if (!resposta.ok) {
            throw new Error('Erro ao cadastrar instituição.');
        }

        setMensagem('Instituição cadastrada com sucesso!');
        setNomeInstituicao('');

    } catch (erro) {
        console.log(erro);
        setMensagem(erro.message);
    }


    };

    useEffect(() => {
        fetch('http://localhost:3000/instituicoes')
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

    const editarInstituicao = (item) => {
        setIdEditando(item.id);
        setNomeInstituicao(item.no_entidade);
        setMensagem('');
    };

    return (
        
            <div>
                <h2 className="mt-4 mb-3">
                    Top 10 Maiores Matrículas das Instuiçoes da Paraíba
                </h2>

                <Form onSubmit={idEditando ? salvarEdicao : cadastrarInstituicao}>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome da instituiçao</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Digite o nome da instituiçao"
                            value={nomeInstituicao}
                            onChange={(e) => setNomeInstituicao(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        {idEditando ? 'Salvar alteraçaes' : 'Cadastrar instituiçao'}
                    </Button>

                </Form>

                {mensagem && (
                    <Alert variant="info">
                        {mensagem}
                    </Alert>
                )}

                <Table striped bordered hover responsive >
                    <thead>
                        <tr>
                            <th>Posiçao</th>
                            <th>Instituiçao</th>
                            <th>Municipio</th>
                            <th>Matriculas</th>
                            <th>Açoes</th>
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
                                <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => editarInstituicao(item)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => excluirInstituicao(item.id)}
                                >
                                    Excluir
                                </Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>  
    );
};

export default InstituicaoEnsino;