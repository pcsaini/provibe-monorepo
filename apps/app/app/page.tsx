import { Button } from "@provibe/ui/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World - This is App</h1>
        <Button size="sm">Button</Button>

        <Link href="/login">
          <Button size="sm" className="mt-5">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}
