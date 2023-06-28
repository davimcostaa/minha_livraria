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
import { useForm } from 'react-hook-form'
import styles from './Autores.module.css'
import editoraValidator from '@/validators/editoraValidator';
import usuariosValidator from '@/validators/usuariosValidator';

const Forms = () => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm();
  const { push, query} = useRouter();

  useEffect(() => {

    if (query.id) {
      axios.get('/api/usuarios/' + query.id).then(resultado => {
        const editora = resultado.data
        
      for (let atributo in editora) {
          setValue(atributo, editora[atributo])
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
      axios.put('/api/usuarios/' + query.id, dados)
      push('/usuarios')
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
              {...register('nome', usuariosValidator.nome)} />
              {
                  errors.nome &&
                  <p className='text-danger mt-2'>{errors.nome.message}</p>
              }
      </Form.Group>

      <Form.Group className="mb-3" controlId="usuario">
          <Form.Label>Usuário</Form.Label>
          <Form.Control mask='@AAAAAAAA' isInvalid={errors.usuario} type="text" placeholder="Escolha um usuário" 
              {...register('usuario', usuariosValidator.usuario)} onChange={handleChange} />
              {
                  errors.usuario &&
                  <p className='text-danger mt-2'>{errors.usuario.message}</p>
              }
      </Form.Group>

      <Form.Group className="mb-3" controlId="telefone">
          <Form.Label>Telefone: </Form.Label>
          <Form.Control mask='(99) 99999-9999' type="text" isInvalid={errors.telefone} {...register('telefone', usuariosValidator.telefone)} onChange={handleChange} />
          {
                  errors.telefone &&
                  <p className='text-danger mt-2'>{errors.telefone.message}</p>
          }
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control type="email" isInvalid={errors.email} {...register('email', usuariosValidator.email)} />
          {
                  errors.email &&
                  <p className='text-danger mt-2'>{errors.email.message}</p>
          }
        </Form.Group>


        <Form.Group className="mb-3" controlId="instagram">
          <Form.Label>Perfil do instagram: </Form.Label>
          <Form.Control type="text" isInvalid={errors.instagram} {...register('instagram', usuariosValidator.instagram)} />
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
                    <Link className="ms-2 btn btn-danger" href="/usuarios">
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