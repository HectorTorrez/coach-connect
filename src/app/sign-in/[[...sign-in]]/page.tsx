import {SignIn} from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="flex h-[calc(100vh-100px)] items-center justify-center">
      <SignIn />
    </section>
  );
}
