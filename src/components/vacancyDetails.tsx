import { useFavorites } from "@/stores/useFavorites";
import type { Vacancy } from "./ui/vancancyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function VacancyDetails({ selectedVacancy }: { selectedVacancy: Vacancy }) {

    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div>
            <div className="text-left flex justify-between relative border-b pb-8">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between w-full">
                        {selectedVacancy?.companyName && (
                            <span className="text-[1rem] font-medium flex gap-2 items-center">
                                <Avatar className="size-10 rounded-md bg-muted ring-1 ring-border">
                                    <AvatarImage
                                      className="object-contain"
                                      src={selectedVacancy.companyDomain ? `https://www.google.com/s2/favicons?sz=64&domain=${selectedVacancy.companyDomain}` : undefined}
                                      alt={selectedVacancy.companyName ?? "icone"}
                                    />
                                    <AvatarFallback className="rounded-md">
                                      {(selectedVacancy.companyName?.[0] || '?').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                {selectedVacancy.companyName}
                                {selectedVacancy.isMine && (
                                    <Badge variant="secondary">Minha vaga</Badge>
                                )}
                            </span>
                        )}

                        <div className="flex gap-2">
                            {selectedVacancy.isMine ? (
                                <Link
                                    className="rounded-md border px-4 py-2 flex items-center"
                                    href={`/job/${selectedVacancy.id}`}
                                >
                                    Editar
                                </Link>
                            ) :
                                <Link
                                    target="blank"
                                    className="bg-primary rounded-md text-primary-foreground flex items-center h-9 px-4 py-2 has-[>svg]:px-3"
                                    href={selectedVacancy?.subscriptionAction ?? ""}
                                >
                                    Candidatar-se
                                </Link>
                            }
                            <Button
                                variant="ghost"
                                onClick={() => selectedVacancy && toggleFavorite(selectedVacancy.id)}
                            >
                                <Heart
                                    size={20}
                                    fill={isFavorite(selectedVacancy?.id ?? -1) ? "currentColor" : "none"}
                                    className={isFavorite(selectedVacancy?.id ?? -1) ? "text-primary" : "text-foreground"}
                                />
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    const url = new URL(window.location.href);
                                    url.searchParams.set("id", selectedVacancy.id.toString());
                                    navigator.clipboard.writeText(url.toString());
                                    alert("Link copiado!");
                                }}
                            >
                                <Share2 size={20} />
                            </Button>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold"> {selectedVacancy?.title} </h1>
                    <div>{selectedVacancy?.location}</div>
                </div>
            </div>

            <div className="vacancy-data pt-1">
                <div className="rounded-[10px] markdown-body pt-6 ml-4">
                    <div className="prose max-w-none text-sm">
                        <div className="markdown-body">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    html: () => null,
                                    br: () => <br />,
                                    p({ children }) {
                                        return <p style={{ marginBottom: "0.75em" }}>{children}</p>;
                                    }
                                }}
                            >
                                {(selectedVacancy?.body || "")
                                    .replace(/<!--[\s\S]*?-->/g, "")
                                    .replace(/\r\n/g, "\n")
                                    .replace(/\n/g, "  \n")}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
