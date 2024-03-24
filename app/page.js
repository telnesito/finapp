import { fugazOne } from "./utils/fuentes";
import Image from 'next/image'
export default function Home() {



  return (
    <main className="h-screen min-h-max w-screen min-w-fit bg-azulMarino">
      <div className="animate-pulse flex flex-col items-center justify-center h-screen">
        <Image className="animate-logo-aparecer relative left-[65px]" width={49} height={49} src={'./logoIcon.svg'}></Image>
        <h1 className={`text-Blanco text-[64px] ${fugazOne.className}`}>FINAPP</h1>
      </div>
    </main>
  );
}
