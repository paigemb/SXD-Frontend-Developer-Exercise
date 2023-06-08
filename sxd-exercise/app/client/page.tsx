// component that holds form

/*Imports */
import { Register } from ".";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 my-10 text-center">
      <div style={{ color: "darkblue", fontSize: "20px", fontWeight: "bold" }}>
        Register for the Talent Show!
      </div>
      <p style={{ fontSize: "15px" }}>
        Thank you so much for your interest in joining our talent show.
        We expect a range of participants at all skill levels, so do not hesitate
        to sign up!
      </p>
      <em style={{ fontSize: "10px" }}>
        Due to previous circumstances, juggling will no longer be permitted
        as a talent
      </em>
      <Register />
    </div>
  );
}
