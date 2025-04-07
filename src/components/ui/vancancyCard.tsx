import { useFavorites } from "@/stores/useFavorites";
import { Banknote, Heart } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";


export interface Vacancy {
    id: number;
    title: string;
    html_url: string;
    created_at: string;
    body: string;
    labels: {
        name: string;
        color: string;
    }[];
    companyName?: string;
    hasSalaryInfo?: boolean;
    companyDomain?: string;
    location?: string;
    subscriptionAction?: string;
}

interface Props {
    vacancy: Vacancy;
    onClick?: () => void;
    selected?: boolean;
}

export default function VacancyCard({ vacancy, onClick, selected }: Props) {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div
            onClick={onClick}
            className={`flex flex-col gap-2 mb-2 px-4 py-6 border-b cursor-pointer transition-all
    ${selected ? "border rounded-md" : "hover:bg-secondary"}`}
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {vacancy.companyDomain && <Image src={`https://www.google.com/s2/favicons?sz=64&domain=${vacancy.companyDomain}`} alt={vacancy.companyName ?? "icone"} width={26} height={26} />}
                    <span className="text-md">{vacancy.companyName}</span>
                </div>
                <Button variant="ghost" onClick={() => vacancy && toggleFavorite(vacancy.id)}>
                    <Heart
                        size={20}
                        fill={isFavorite(vacancy?.id ?? -1) ? "currentColor" : "none"}
                        className={isFavorite(vacancy?.id ?? -1) ? "text-primary" : "text-foreground"}
                    />
                </Button>

            </div>
            <h3 className="font-bold">{vacancy.title}</h3>
            <div className="flex gap-2 mt-2 flex-wrap">
                {vacancy.labels.map((label, j) => (
                    <span
                        key={j}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                            color: `#${label.color}`,
                            borderColor: `#${label.color}`,
                            borderWidth: '1px',
                            borderStyle: 'solid'
                        }}
                    >
                        {label.name}
                    </span>
                ))}
            </div>
            <div>
                {vacancy.location}
            </div>
            <div className="flex justify-between w-full text-sm">
                {vacancy.hasSalaryInfo ?
                    <div className="flex gap-2 bg-teal-100 text-teal-900 w-fit px-4 py-1 rounded-md items-center">
                        <Banknote />
                        <span className="font-bold">Salário informado</span>
                    </div>

                    :

                    <div></div>}
                <div className="flex gap-2 font-light text-sm">
                    <span>Publicado em </span>
                    <span>
                        {new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        }).format(new Date(vacancy.created_at))}
                    </span>
                </div>
            </div>
        </div>
    );
}