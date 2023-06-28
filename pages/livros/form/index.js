import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import { mask } from 'remask'
import livroValidator from '@/validators/livroValidator'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/components/Menu'
import Banner from '@/components/Banner'
import styles from './Autores.module.css'

const form = () => {

  const { push } = useRouter()
  const { register, setValue, handleSubmit, formState: {errors} } = useForm()
  const [editoras, setEditoras] = useState([])
  const [autores, setAutores] = useState([])

  useEffect(() => {
    getAll()
}, [])

function getAll() {

    axios.get('/api/editoras').then(resultado => {
      setEditoras(resultado.data)
    })

    axios.get('/api/autores').then(resultado => {
      setAutores(resultado.data)
    })

}

  function salvar(dados){
    
    axios.post('/api/livros', dados)
    push('/livros')

  }

  function handleChange(event) {

    const name = event.target.name
    const valor = event.target.value
    const mascara = event.target.getAttribute('mask')

    setValue(name, mask(valor, mascara))

  }

  return (
    <>


    <Menu />
    <Banner titulo='Cadastro de livros' />

    <section className={styles.container}>
      <section className={styles.formulario}>

      <Form>

      <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" placeholder="Digite o nome do livro" 
              {...register('nome', livroValidator.nome)} />
              {
                  errors.nome &&
                  <p className='text-danger mt-2'>{errors.nome.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="isbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control mask='999-99-999-9999-9' isInvalid={errors.isbn} type="text" placeholder="Digite o ISBN do livro" 
              {...register('isbn', livroValidator.isbn)} onChange={handleChange} />
              {
                  errors.isbn &&
                  <p className='text-danger mt-2'>{errors.isbn.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="data">
          <Form.Label>Data de lançamento</Form.Label>
          <Form.Control mask='99/99/9999' isInvalid={errors.data} type="text" placeholder="Digite a data de lançamento do livro" 
            {...register('data', livroValidator.data)} onChange={handleChange} />
              {
                  errors.data &&
                  <p className='text-danger mt-2'>{errors.data.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="autor">
          <Form.Label>Autor</Form.Label>
          <Form.Select {...register('autor', livroValidator.autor)}>
                { autores.map((i) => ( <option>{i.nome}</option> )) } 
          </Form.Select>
              {
                  errors.autor &&
                  <p className='text-danger mt-2'>
                  {errors.autor.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="editora">
          <Form.Label>Editora</Form.Label>
          <Form.Select {...register('editora', livroValidator.editora)}>
                { editoras.map((i) => ( <option>{i.nome}</option> )) } 
          </Form.Select>
              {
                  errors.editora &&
                  <p className='text-danger mt-2'>
                  {errors.autor.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="genero">
          <Form.Label>Gênero principal</Form.Label>
          <Form.Select {...register('genero', livroValidator.genero)}>
                 <option> Fantasia </option>  
                 <option> Romance </option>  
                 <option> Terror </option>  
                 <option> Distopia </option>  
                 <option> Comédia </option>  
          </Form.Select>
              {
                  errors.genero &&
                  <p className='text-danger mt-2'>{errors.genero.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="paginas">
          <Form.Label>Número de páginas</Form.Label>
          <Form.Control isInvalid={errors.paginas} type="text" placeholder="Digite o número de páginas do livro" 
              {...register('paginas', livroValidator.paginas)} />
              {
                  errors.paginas &&
                  <p className='text-danger mt-2'>{errors.paginas.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="capa">
          <Form.Label>Capa do livro</Form.Label>
          <Form.Control isInvalid={errors.capa} type="text" placeholder="Digite o link da internet com a capa do livro" 
          {...register('capa', livroValidator.capa)} />
              {
                  errors.capa &&
                  <p className='text-danger mt-2'>{errors.capa.message}</p>
              }
        </Form.Group>
        

        <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/livros">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
      </Form>
      </section>
      </section>
    </>
  )
}

export default form