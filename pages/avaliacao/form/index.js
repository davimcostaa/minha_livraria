import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import avaliacaoValidator from '@/validators/avaliacaoValidator'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/components/Menu'
import Banner from '@/components/Banner'
import styles from './Autores.module.css'
import ReactStars from 'react-stars'

const form = () => {

  const { push } = useRouter()
  const { register, setValue, handleSubmit, formState: {errors} } = useForm()
  const [livros, setLivros] = useState([])
  const [avaliacao, setAvaliacao] = useState([])

  useEffect(() => {
    getAll()
}, [])

const ratingChanged = (newRating) => {
  console.log(newRating)
  setAvaliacao(newRating)
}

function getAll() {

  axios.get('/api/livros').then(resultado => {
    setLivros(resultado.data)
  })
}

function pegarCampos(e) {

  console.log(e.target)
}

function salvar(dados){
    dados.avaliacao = avaliacao;
    axios.post('/api/avaliacao', dados)
    push('/avaliacao')

  }

  return (
    <>


    <Menu />
    <Banner titulo='Avaliação dos livros' />

    <section className={styles.container}>
      <section className={styles.formulario}>

      <Form>

      <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Livros cadastrados</Form.Label>
          <Form.Select {...register('nome', avaliacaoValidator.nome)}>
                { livros.map((i) => ( <option> {i.nome} </option> ))}                
          </Form.Select>          
              {
                  errors.nome &&
                  <p className='text-danger mt-2'>
                  {errors.nome.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="review">
          <Form.Label>Faça o review do livro</Form.Label>
          <Form.Control isInvalid={errors.review} type="text"
              {...register('review', avaliacaoValidator.review)} />
              {
                  errors.review &&
                  <p className='text-danger mt-2'>{errors.review.message}</p>
              }
        </Form.Group>   

        <Form.Group className="mb-3" controlId="avaliacao">
        <ReactStars
            count={5}
            onChange={ratingChanged}
            size={40}
            color2={'#ffd700'}
            half={false}
        />
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