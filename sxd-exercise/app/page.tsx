import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href="/client">Join the Talent Show!</Link>
    </div>
  )
}
