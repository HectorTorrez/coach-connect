import {SignUp} from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="flex h-[calc(100vh-100px)] items-center justify-center">
      <SignUp />
    </section>
  );
}
