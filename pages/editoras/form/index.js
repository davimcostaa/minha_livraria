import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Link from 'next/link'
import editoraValidator from '@/validators/editoraValidator'
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/components/Menu'
import Banner from '@/components/Banner'
import styles from './Autores.module.css'

const form = () => {

  const { push } = useRouter()
  const { register, handleSubmit, formState: {errors} } = useForm()

  function salvar(dados){
    
    axios.post('/api/editoras', dados)
    push('/editoras')

  }

  return (
    <>


    <Menu />
    <Banner titulo='Cadastro de editora' />

    <section className={styles.container}>

    <section className={styles.formulario}>

    
      <Form>

      <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control isInvalid={errors.nome} type="text" placeholder="Digite o nome da editora" 
              {...register('nome', editoraValidator.nome)} />
              {
                  errors.nome &&
                  <p className='text-danger mt-2'>{errors.nome.message}</p>
              }
        </Form.Group>

        <Form.Group className="mb-3" controlId="instagram">
          <Form.Label>Instagram da editora</Form.Label>
          <Form.Control isInvalid={errors.instagram} type="text" placeholder="Digite o usuário da editora (se tiver)" 
            {...register('instagram', editoraValidator.instagram)} />
              {
                  errors.instagram &&
                  <p className='text-danger mt-2'>{errors.instagram.message}</p>
              }
        </Form.Group>


        <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/editoras">
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