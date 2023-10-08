import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex w-[100vw] h-[90vh] items-center justify-center bg-green-500">
      <SignUp />
    </div>
  );
}
