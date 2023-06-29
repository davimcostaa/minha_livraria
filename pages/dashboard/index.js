import Menu from '@/components/Menu'
import React, { useEffect, useState } from 'react'
import { Card, Carousel, Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { GiBookPile } from 'react-icons/gi';
import { Chart } from "react-google-charts";


const index = () => {

    const [avaliacao, setAvaliacao] = useState([])
    const [livros, setLivros] = useState([])
    const [generos, setGeneros] = useState(['Gênero', 'Quantidade'])

    useEffect(() => {

        axios.get('/api/livros').then(resultado => {
            setLivros(resultado.data)
          })

          axios.get('/api/avaliacao/').then(resultado => {
            const avaliacao = resultado.data
            setAvaliacao(avaliacao)
        })
      }, [])

      const livrosFiltrados = livros.filter(livro =>
        avaliacao.some(avaliacao => avaliacao.nome === livro.nome)
      );

      const somaPaginas = livrosFiltrados.reduce((total, livro) => total + parseInt(livro.paginas), 0);


      const countGenres = (livros) => {
        const genresCount = livros.reduce((count, livro) => {
          const { genero } = livro;
          count[genero] = (count[genero] || 0) + 1;
          return count;
        }, {});
      
        return genresCount;
      };
      
      const genresCount = countGenres(livrosFiltrados);

      const formatDataForChart = () => {
        const formattedData = Object.entries(genresCount).map(([genero, quantidade]) => [genero, quantidade]);
        return [["Gênero", "Quantidade"], ...formattedData];
      };
      
      const data = formatDataForChart();
      console.log(genresCount);


      
  return (
    <>
        <Menu />
        <Container>
          <Row> 
        <Card className='w-25 mt-4 me-5 text-white' bg='dark' >
      <Card.Header> <GiBookPile size={50} /> </Card.Header>
      <Card.Body>
        <Card.Title>Livros lidos</Card.Title>
        <Card.Text className='h4'>
          {livrosFiltrados.length}
        </Card.Text>
       
      </Card.Body>
    </Card>

    {' '}

    <Card className='w-25 mt-4 text-white' bg='dark' >
      <Card.Header> <GiBookPile size={50} /> </Card.Header>
      <Card.Body>
        <Card.Title>Total de páginas lidas</Card.Title>
        <Card.Text className='h4'>
          {somaPaginas}
        </Card.Text>
       
      </Card.Body>
    </Card>

    </Row>

  <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}

    /> 
        </Container>
    </>
  )
}

export default index