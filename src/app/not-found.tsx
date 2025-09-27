import Button from "@/components/Button/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-150px)] flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">Oupss... 404</h1>
      <p className="text-muted-foreground mb-6">
        Cette page n&apos;existe pas (ou plus du tout).
      </p>
      <Button>
        <Link href="/">Retournez à l&apos;accueil ici</Link>
      </Button>
    </div>
  );
}
