import Head from 'next/head';
import Link from 'next/link';
export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Books App</h1>
        <Link href="/libros">Book List</Link>
      </main>
    </div>
  )
}
