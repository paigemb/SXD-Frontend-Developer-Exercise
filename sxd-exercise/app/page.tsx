/*Entry/server page */

/*Imports */
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href="/client">Click here to join the Talent Show!</Link>
    </div>
  );
}
