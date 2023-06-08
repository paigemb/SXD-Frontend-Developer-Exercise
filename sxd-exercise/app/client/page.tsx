import { Register } from ".";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-6 my-10 text-center">
      <div style={{ color: "darkblue", fontSize: "20px", fontWeight: "bold" }}>
        Register for the Talent Show!
      </div>
      <p style={{ fontSize: "15px" }}>
        Thank you so much for your interest in joining this year's talent show.
        We expect a range of participants at all skill levels, so don't hesitate
        to sign up!
      </p>
      <em style={{ fontSize: "10px" }}>
        *Due to last year's circumstances, juggling will no longer be permitted
        as a talent
      </em>
      <Register />
    </div>
  );
}
