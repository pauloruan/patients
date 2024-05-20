import { Typography } from "../components/typography"

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Typography.H2 className="animate-pulse">Carregando...</Typography.H2>
    </div>
  )
}
