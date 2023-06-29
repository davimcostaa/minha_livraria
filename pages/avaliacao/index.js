
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { AiFillPlusCircle } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import axios from 'axios';
import Menu from '@/components/Menu';
import Banner from '@/components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './form/Autores.module.css'
import ReactStars from 'react-stars';

const index = () => {

    const [avaliacao, setAvaliacao] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {
        axios.get('api/avaliacao').then(resultado => {
            setAvaliacao(resultado.data)
        })
    }

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro')) {
            axios.delete('/api/avaliacao/' + id)
            getAll()
       }
    }

    console.log(avaliacao)

    return (

        <>
       
            <Menu />
            <Banner titulo='Avaliações' />

            <section className={styles.container}> 

            <section className={styles.listagem}>              
            

            <Link href="/avaliacao/form/" className='mb-2 btn btn-primary'>
                <AiFillPlusCircle className='m-1' />
                Novo
            </Link>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Livro</th>
                        <th>Avaliação</th>
                    </tr>
                </thead>
                <tbody>
                    {avaliacao.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={'/avaliacao/form/' + item.id}> <FiEdit className='text-primary' /></Link>
                                <BsTrash3 onClick={() => excluir(item.id)} className='text-danger me-4' />
                            </td>

                            <td>{item.nome}</td>
                            <td>         
                                <ReactStars
                                    count={5}
                                    value={item.avaliacao}
                                    edit={false}
                                    size={40}
                                    color2={'#ffd700'}
                                    half={false} /> 
                            </td>

                        </tr>
                    ))}

                </tbody>
            </Table>

            </section>
            </section>
        </>
    )
}

export default index