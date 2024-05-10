import Navegacao from '../../components/Navegacao/Navegacao';
import CardAnimal from '../../components/CardAnimal/CardAnimal';
import './Animais.css'
import { useEffect, useState } from "react";
import AnimalRequests from '../../../fetch/AnimalRequests';
function Animais() {

    // useState é um Hook responsável por manipular variáveis no React
    // Criando um array que vai receber do back-end as informações sobre os animais (nome, idade, genero, etc)
    const [animais, setAnimais] = useState([]);

    // useEffect é um Hook responsável por fazer uma conexão de rede com algum recurso (banco de dados, API, etc)
    useEffect(() => {

        const fetchData = async() => {
            setAnimais(await AnimalRequests.listarAnimais());
        }
        // Chama a função para recuperar os dados dos animais do back-end
        fetchData();
    }, []);

    return(
        <>
            <Navegacao />
        <div className='ctn-animais'>
            {animais.length > 0 ? (
                animais.map((animal) => (
            <CardAnimal key = {animal.idanimal} animal={animal}/>
                ))
            ): (
                <p>Carregando... Verifique se o servidor está funcionando</p>
            )}
        </div>
        </>
    );
}

export default Animais