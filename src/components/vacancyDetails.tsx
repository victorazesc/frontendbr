import { useFavorites } from "@/stores/useFavorites";
import type { Vacancy } from "./ui/vancancyCard";
import Image from "next/image";
import Link from "next/link";
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
                                {selectedVacancy.companyDomain && (
                                    <Image
                                        src={`https://www.google.com/s2/favicons?sz=64&domain=${selectedVacancy.companyDomain}`}
                                        alt={selectedVacancy.companyName ?? "icone"}
                                        width={45}
                                        height={45}
                                    />
                                )}
                                {selectedVacancy.companyName}
                            </span>
                        )}

                        <div className="flex gap-2">
                            <Link
                                target="blank"
                                className="bg-primary rounded-md text-primary-foreground flex items-center h-9 px-4 py-2 has-[>svg]:px-3"
                                href={selectedVacancy?.subscriptionAction ?? ""}
                            >
                                Candidatar-se
                            </Link>
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