
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

const index = () => {

    const [editoras, setEditoras] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {
        axios.get('api/editoras').then(resultado => {
            setEditoras(resultado.data)
        })
    }

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro')) {
            axios.delete('/api/editoras/' + id)
            getAll()
       }
    }

    return (

        <>
       
            <Menu />
            <Banner titulo='Editoras' />

            <section className={styles.container}> 

            <section className={styles.listagem}>              
            

            <Link href="/editoras/form/" className='mb-2 btn btn-primary'>
                <AiFillPlusCircle className='m-1' />
                Novo
            </Link>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome da editora</th>
                        <th>Instagram</th>
                    </tr>
                </thead>
                <tbody>
                    {editoras.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link href={'/editoras/form/' + item.id}> <FiEdit className='text-primary' /></Link>
                                <BsTrash3 onClick={() => excluir(item.id)} className='text-danger me-4' />
                            </td>

                            <td>{item.nome}</td>
                            <td>{item.instagram}</td>


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