import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from '@/components/Banner'
import Menu from '@/components/Menu'
import autoresValidator from '@/validators/autoresValidator'
import axios from 'axios'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { mask } from 'remask'
import { useForm } from 'react-hook-form'
import styles from './Autores.module.css'

const Forms = () => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm();
  const { push, query} = useRouter();

  useEffect(() => {

    if (query.id) {
      axios.get('/api/autores/' + query.id).then(resultado => {
        const autor = resultado.data
        
      for (let atributo in autor) {
          setValue(atributo, autor[atributo])
      }
    })

    }

  }, [query.id])


  function handleChange(event) {

    const name = event.target.name
    const valor = event.target.value
    const mascara = event.target.getAttribute('mask')

    setValue(name, mask(valor, mascara))

  }
  

  function salvar(dados){
      axios.put('/api/autores/' + query.id, dados)
      push('/autores')
  }

  return (
    <>
      <Menu />
    <Banner titulo='Cadastro de autor' />

    <section className={styles.container}>

    <section className={styles.formulario}>

    
      <Form>

      <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" placeholder="Digite o nome do autor" 
              {...register('nome', autoresValidator.nome)} />
              {
                  errors.nome &&
                  <p className='text-danger mt-2'>{errors.nome.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="data">
          <Form.Label>Data de nascimento</Form.Label>
          <Form.Control mask='99/99/9999' isInvalid={errors.data} type="text" placeholder="Digite a data de nascimento do autor" 
            {...register('data', autoresValidator.data)} onChange={handleChange} />
              {
                  errors.data &&
                  <p className='text-danger mt-2'>{errors.data.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="nacionalidade">
          <Form.Label>Nacionalidade</Form.Label>
          <Form.Control isInvalid={errors.nacionalidade} type="text" placeholder="Digite a nacionalidade" 
          {...register('nacionalidade', autoresValidator.nacionalidade)} />
              {
                  errors.nacionalidade &&
                  <p className='text-danger mt-2'>{errors.nacionalidade.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="genero">
          <Form.Label>Principal gênero literário</Form.Label>
          <Form.Control isInvalid={errors.genero} type="text" placeholder="Digite a genero" 
          {...register('genero', autoresValidator.genero)} />
              {
                  errors.genero &&
                  <p className='text-danger mt-2'>{errors.genero.message}</p>
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