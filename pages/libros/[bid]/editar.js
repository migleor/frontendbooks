import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps({params}){

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)
    const data = await res.json()

    return {
        props: {
            book: data
        }
    }
}



const BookEdit = ({book}) => {
    const router = useRouter()
    const [bookTitle, setBookTitle] = useState(book.title)
    const [bookAutor, setBookAutor] = useState(book.autor)
    const [bookImage, setBookImage] = useState(book.image)
    const [submitting, setSubmitting] = useState(false)
    const [errors, setErrors] = useState([])
    
    async function handleSubmit(e){
        e.preventDefault()
        setSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`,{
            method: 'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json',
            },
            body: JSON.stringify({
                title:bookTitle,
                autor:bookAutor,
                image:bookImage,
                _method: 'PATCH'
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
            <h1>Book Edit</h1>
            <Link href="/libros">Book List</Link>
            <br></br>
            <form onSubmit={handleSubmit}>
                <label>Titulo</label>
                <input 
                onChange={(e) => setBookTitle(e.target.value) }
                value={String(bookTitle)}
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
                value={String(bookAutor)}
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
                value={String(bookImage)}
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

export default BookEdit