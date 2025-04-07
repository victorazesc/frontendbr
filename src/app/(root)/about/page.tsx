import { BookOpenText } from "lucide-react";
import Link from "next/link";

export default function About() {
    return (
        <div className="px-4 py-8 flex items-center justify-center">
            <div className="max-w-2xl flex gap-4 flex-col">
                <div className="text-center w-full flex items-center justify-center py-12">
                    <BookOpenText size={40} />
                </div>
                <p>

                    Sobre
                    Aplicação desenvolvida para auxiliar pessoas a encontrar vagas para programador frontend, desenvolvido por {" "}

                    <Link href={"https://azevedo.click"} >
                        @victorazesc
                    </Link>
                    .
                </p>
                <p>

                    De uma olhada no <Link href={"https://github.com/victorazesc/frontendbr"} >
                        repositório do projeto
                    </Link>  para mais detalhes.
                </p>

                <Link href={'/'}>
                    ver vagas
                </Link>
            </div>
        </div>
    )
}