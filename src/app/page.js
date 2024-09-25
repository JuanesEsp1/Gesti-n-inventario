import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Hola Mundo</h1>
      <Link href="/Login">Ir a Login</Link>
    </div>
  );
}
