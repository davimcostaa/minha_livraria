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
import avaliacaoValidator from '@/validators/avaliacaoValidator';
import ReactStars from 'react-stars';

const Forms = () => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm();
  const { push, query} = useRouter();
  const [avaliacao, setAvaliacao] = useState([])
  const [avaliacaoAntiga, setAvaliacaoAntiga] = useState([])

const ratingChanged = (newRating) => {
  console.log(newRating)
  setAvaliacao(newRating)
}


  useEffect(() => {


    if (query.id) {
      axios.get('/api/avaliacao/' + query.id).then(resultado => {
        const avaliacao = resultado.data
        setAvaliacaoAntiga(avaliacao)
        
      for (let atributo in avaliacao) {
          setValue(atributo, avaliacao[atributo])
      }
    })

    }

  }, [query.id])
  

  function salvar(dados){
      dados.avaliacao = avaliacao;
      axios.put('/api/avaliacao/' + query.id, dados)
      push('/avaliacao')
  }
  
  return (
    <>
      <Menu />
    <Banner titulo='Cadastro de livro' />

    <section className={styles.container}>

    <section className={styles.formulario}>

    
      <Form>

      <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Livros cadastrados</Form.Label>
          <Form.Select {...register('nome', avaliacaoValidator.nome)}>
                 <option> {avaliacaoAntiga.nome} </option>             
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
            value={avaliacaoAntiga.avaliacao}
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