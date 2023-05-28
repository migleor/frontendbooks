import Link from 'next/link';
export async function getStaticProps(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`)
    
    const data = await res.json()


    return {
        props: {
            books: data
        }
    }
}

const BookList = ({books}) => {
    async function handleDelete(e, bookId){
        e.preventDefault()
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,{
            method: 'POST',
            headers:{
                accept:'application/json',
                'content-type':'application/json',
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        })
        if(res.ok){
            window.location.href = "/libros"
        }
    }
    return (
        <div>
            <h1>Book List</h1>
            <Link href="/libros/crear">Create Book</Link>
            <ul>
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link href={`/libros/${book.id}`}>{book.title}</Link>
                        {' - '}
                        <Link href={`/libros/${book.id}/editar`}>Editar</Link>
                        {' - '}
                        <form onSubmit={(e)=>handleDelete(e, book.id)} style={{ display: 'inline' }}>
                            <button>Eliminar</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookList