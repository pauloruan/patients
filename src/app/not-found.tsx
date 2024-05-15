import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Typography } from "../components/typography"

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <Typography.H1>Página não encontrada.</Typography.H1>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Typography.P>Página em manutenção, estamos trabalhando.</Typography.P>
        <Link href="/" className="flex items-center gap-2 font-sans underline">
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </div>
      <Image
        src="https://media1.tenor.com/m/KGMKkNcyBXEAAAAC/cat-face-in-laptop.gif"
        alt="Página não encontrada"
        width={400}
        height={400}
        unoptimized
        priority
        className="mx-auto h-full max-h-96 w-full max-w-96 rounded-sm object-cover shadow-md"
      />
    </div>
  )
}
