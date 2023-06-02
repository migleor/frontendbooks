import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';

const BookCreate = () => {
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState('')
    const [bookAutor, setBookAutor] = useState('')
    const [bookImage, setBookImage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState([])
    
    async function handleSubmit(e){
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,{
            method: 'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json',
            },
            body: JSON.stringify({
                title:bookTitle,
                autor:bookAutor,
                image:bookImage
            })
        })
        if(res.ok){
            setErrors([])
            setBookTitle('')
            setBookAutor('')
            setBookImage('')
            return router.push('/libros')
        }

        const data = await res.json()
        setErrors(data.errors)
        setSubmitting(false)
    }

    return (
        <div>
            <h1>Create Book</h1>
            <Link href="/libros">Book List</Link>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>Titulo</label>
                <input 
                onChange={(e) => setBookTitle(e.target.value) }
                value={bookTitle}
                disabled={submitting}
                type="text"></input>
                {errors.title && <span style={{
                    color:'red',
                    display: 'block'
                }}>{errors.title}</span>}
                <br></br>
                <label>Autor</label>
                <input 
                onChange={(e) => setBookAutor(e.target.value) }
                value={bookAutor}
                disabled={submitting}
                type="text"></input>
                {errors.autor && <span style={{
                    color:'red',
                    display: 'block'
                }}>{errors.autor}</span>}
                <br></br>
                <label>Image</label>
                <input 
                onChange={(e) => setBookImage(e.target.value) }
                value={bookImage}
                disabled={submitting}
                type="text"></input>
                {errors.image && <span style={{
                    color:'red',
                    display: 'block'
                }}>{errors.image}</span>}
                <br></br>
                <button 
                disabled={submitting}
                >{submitting ? 'Enviando...' : 'Enviar'}</button>
            </form>
        </div>
    )
}

export default BookCreate