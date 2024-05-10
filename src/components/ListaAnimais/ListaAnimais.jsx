import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import AnimalRequests from '../../../fetch/AnimalRequests';

function ListaAnimais() {

    // useState é um Hook responsável por manipular variáveis no React
    // Criando um array que vai receber do back-end as informações sobre os animais (nome, idade, genero, etc)
    const [animais, setAnimais] = useState([]);

    // useEffect é um Hook responsável por fazer uma conexão de rede com algum recurso (banco de dados, API, etc)
    useEffect(() => {
        const fetchData = async () => {
            setAnimais(await AnimalRequests.listarAnimais());
        }

        // Chama a função para recuperar os dados dos animais do back-end
        fetchData();
    }, []);

    const deletarAnimal = async (id) => {
        const confirma = window.confirm(`Deseja mesmo deletar o animal ${id}?`);
        if(confirma) {
           if( await AnimalRequests.deletarAnimal(id)){
            window.alert('Animal deletado com sucesso');
            window.location.reload();
           } else {
            window.alert('Erro ao deletar o animal');
           }
        }
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Genero</th>
                        <th>Envergadura</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {animais.length > 0 ? (
                        animais.map((animal)=>(
                            <tr>
                            <td>{animal.nomeanimal}</td>
                            <td>{animal.idadeanimal}</td>
                            <td>{animal.generoanimal}</td>
                            <td>{animal.envergadura}</td>
                            <td onClick={() => deletarAnimal(animal.idanimal)}>Deletar</td>
                        </tr>
                        )
                        )) : (
                            <p>carregando ... verifique se o servidor esta conectado</p>
                        )}
                </tbody>
            </Table>
        </>
    );
}
;
export default ListaAnimais