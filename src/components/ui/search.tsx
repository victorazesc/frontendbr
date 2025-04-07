import { Search } from "lucide-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {

    return (
        <div className="flex gap-1 bg-secondary p-2 rounded-xl w-full max-w-2xl mx-4">
            {/* Campo de busca */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-l-xl">
                <Search className="text-secondary-foreground" />
                <input
                    type="text"
                    placeholder="Encontre a melhor vaga para você"
                    className="bg-transparent text-sm placeholder-secondary-foreground focus:outline-none"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </div>
    );
}