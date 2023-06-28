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

const Forms = () => {

  const { register, handleSubmit, setValue, formState: {errors} } = useForm();
  const { push, query} = useRouter();

  useEffect(() => {

    if (query.id) {
      axios.get('/api/editoras/' + query.id).then(resultado => {
        const editora = resultado.data
        
      for (let atributo in editora) {
          setValue(atributo, editora[atributo])
      }
    })

    }

  }, [query.id])
  

  function salvar(dados){
      axios.put('/api/editoras/' + query.id, dados)
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

export default Forms