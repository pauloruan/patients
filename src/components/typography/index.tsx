import { H1 } from "./components/H1"
import { H2 } from "./components/H2"
import { H3 } from "./components/H3"
import { H4 } from "./components/H4"
import { P } from "./components/P"
import { Strong } from "./components/Strong"

interface TypographyProps {
  H1: typeof H1
  H2: typeof H2
  H3: typeof H3
  H4: typeof H4
  P: typeof P
  Strong: typeof Strong
}

export const Typography: TypographyProps = {
  H1,
  H2,
  H3,
  H4,
  P,
  Strong,
}
