import { SignIn } from "@clerk/nextjs";

export default function Page(params: any) {
  console.log(params)
  return (
    <div className="flex h-screen items-center justify-center ">
      <SignIn />
    </div>
  );
}
