import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from '@/components/Banner'
import Menu from '@/components/Menu'
import autoresValidator from '@/validators/autoresValidator'
import axios from 'axios'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import styles from './Autores.module.css'
import livroValidator from '@/validators/livroValidator';

const Forms = () => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm();
  const { push, query} = useRouter();
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

  useEffect(() => {

    if (query.id) {
      axios.get('/api/livros/' + query.id).then(resultado => {
        const autor = resultado.data
        
      for (let atributo in autor) {
          setValue(atributo, autor[atributo])
      }
    })

    }

  }, [query.id])
  

  function salvar(dados){
      axios.put('/api/livros/' + query.id, dados)
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
    <Banner titulo='Cadastro de livro' />

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
                    <Link className="ms-2 btn btn-danger" href="/autores">
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

export default Forms