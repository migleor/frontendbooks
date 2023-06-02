import Link from 'next/link';

export async function getStaticProps({ params }){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`)
    
    const data = await res.json()


    return {
        props: {
            book: data
        }
    }
}

export async function getStaticPaths(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    
    const data = await res.json()    

    return {
        paths: data.map(book =>{
            return { params: { bid: String(book.id) } }
        }),
        fallback: false
    }
}

const BookDetail = ({book}) => {
    return (
        <>
            <Link href="/libros">Book List</Link>
            <h1>{book.title}</h1>
            <span><b>Autor:</b> {book.autor}</span><br></br>
            <span><b>Caratula</b></span>
            <br></br><img src={`${book.image}`} alt={`Imagen ${book.title}`} width={80} height={80} ></img>
        </>
    )
}

export default BookDetail