import { Fugaz_One } from "next/font/google"
import { Poppins } from "next/font/google"

export const fugazOne = Fugaz_One({
  subsets: ['latin'],
  weight: '400'
})


export const Popins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})