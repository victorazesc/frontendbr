import { useFavorites } from "@/stores/useFavorites";
import { Banknote, Heart } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./button";


export interface Vacancy {
    id: string;
    title: string;
    html_url: string;
    created_at: string | Date;
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
    isMine?: boolean;
    source?: string;
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
                    <Avatar className="size-6 rounded-md bg-muted ring-1 ring-border">
                        <AvatarImage className="object-contain" src={vacancy.companyDomain ? `https://www.google.com/s2/favicons?sz=64&domain=${vacancy.companyDomain}` : undefined} alt={vacancy.companyName ?? "icone"} />
                        <AvatarFallback className="rounded-md text-xs">
                            {(vacancy.companyName?.[0] || '?').toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-md">{vacancy.companyName}</span>
                </div>
                <div className="flex items-center gap-2">
                {vacancy.isMine && (
                    <span className="text-xs px-2 py-0.5 rounded-md border bg-secondary">Minha vaga</span>
                )}
                <Button variant="ghost" onClick={() => vacancy && toggleFavorite(vacancy.id)}>
                    <Heart
                        size={20}
                        fill={isFavorite(vacancy?.id ?? -1) ? "currentColor" : "none"}
                        className={isFavorite(vacancy?.id ?? -1) ? "text-primary" : "text-foreground"}
                    />
                </Button>
                </div>

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
                        {vacancy?.created_at && new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        }).format(new Date(vacancy?.created_at))}
                    </span>
                </div>
            </div>
        </div>
    );
}
