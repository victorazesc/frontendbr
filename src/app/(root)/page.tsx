"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, CircleFadingPlus, Info } from "lucide-react"
import SearchBar from "@/components/ui/search";
import VacancyCard, { type Vacancy } from "@/components/ui/vancancyCard";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/stores/useFavorites";
import VacancyDetails from "@/components/vacancyDetails";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [filtered, setFiltered] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'salary'>('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, showFavorites } = useFavorites();
  const { data } = useSession();

  useEffect(() => {
    const filteredVacancies = vacancies
      .filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    setFiltered(filteredVacancies)
  }, [searchTerm, vacancies])

  useEffect(() => {
    if (showFavorites) {
      const filteredVacancies = vacancies
        .filter(v =>
          favorites.includes(v.id)
        )
      setFiltered(filteredVacancies)
      setSearchTerm('')
    } else {
      setSearchTerm('')
      setFiltered([])
    }
  }, [showFavorites, vacancies, favorites])


  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const isNowMobile = window.innerWidth < 768;
    setIsMobile(isNowMobile);

    const fetchVacancies = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `api/jobs`
        );


        setVacancies((prev) => {
          const all = [...prev, ...response.data];

          const urlParams = new URLSearchParams(window.location.search);
          const idFromURL = urlParams.get("id");

          const foundVacancy = idFromURL
            ? all.find((v) => v.id.toString() === idFromURL)
            : null;

          if (foundVacancy) {
            setSelectedVacancy(foundVacancy);
          } else if (!isNowMobile && all.length > 0) {
            setSelectedVacancy(all[0]);
          }

          return all;
        });

      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    if (showFavorites) {
      const filteredVacancies = vacancies
        .filter(v =>
          favorites.includes(v.id)
        )
      setFiltered(filteredVacancies)
      setSearchTerm('')
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedVacancies = (filtered.length > 0 ? filtered : vacancies).slice().sort((a, b) => {
    if (sortBy === 'salary') {
      // Prioriza vagas que têm info de salário
      return (b.hasSalaryInfo ? 1 : 0) - (a.hasSalaryInfo ? 1 : 0);
    }

    // Default: por data (mais recentes primeiro)
    return new Date(b?.created_at).getTime() - new Date(a?.created_at).getTime();
  });

  return (
    <>
      <div className={`border-b flex flex-col gap-4 items-center justify-center py-8 ${isMobile && selectedVacancy ? 'hidden' : 'visible'}`}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        {data?.user && <Link className="flex gap-1 items-center" href={'/job'}><CircleFadingPlus size={16} /> Adicione Agora uma mesmo uma vaga de trabalho</Link>}

      </div>


      <div className={`border-b flex items-center justify-start py-4 ${isMobile && selectedVacancy ? 'visible' : 'hidden'}`}>
        <Button
          onClick={() => setSelectedVacancy(null)}
          variant="ghost"
          className="font-normal text-lg flex gap-2 items-center"
        >
          <ChevronLeft size={20} /> Voltar para as Vagas
        </Button>
      </div>

      {
        searchTerm.length > 0 && filtered.length === 0 &&
        <div className="bg-secondary py-4 flex gap-4 px-4 mt-8">
          <Info className="text-primary" size={20} />  Sua busca por {searchTerm} nessa não tem resultados ou tem resultados limitados abaixo algumas recomendações que possa fazer sentido para você.
        </div>
      }


      <div className={`grid  md:grid-cols-[35%_auto] gap-2 ${isMobile && selectedVacancy ? 'mt-0' : 'mt-8'}`}>
        {/* COLUNA DA ESQUERDA */}
        <div className={`${isMobile && selectedVacancy ? 'hidden' : 'visible'}`}>
          <div className="flex justify-between items-center px-6 py-2">
            <span>{filtered.length > 0 ? filtered.length : vacancies.length} Vagas encontradas </span>
            <div className="flex gap-2 items-center text-sm">
              <select
                className="bg-transparent border-none outline-none text-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'salary')}
              >
                <option value="recent">Mais recentes</option>
                <option value="salary">Com remuneração</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col pt-1 pl-4 pr-4 md:pr-8">
            {sortedVacancies.map((vacancy, i) => (
              <VacancyCard
                key={i}
                vacancy={vacancy}
                onClick={() => setSelectedVacancy(vacancy)}
                selected={selectedVacancy?.id === vacancy.id}
              />
            ))
            }

            {loading && (
              <div className="text-center py-4">Carregando...</div>
            )}
          </div>
        </div>


        {/* COLUNA DA DIREITA */}
        {!isMobile ? (
          <div className="border rounded-md px-6 py-4 h-screen sticky top-[30px] overflow-y-auto">
            {selectedVacancy && <VacancyDetails selectedVacancy={selectedVacancy} />}
          </div>
        ) : selectedVacancy ? (
          <div className="inset-0 bg-background z-50 p-6 overflow-y-auto">
            <VacancyDetails selectedVacancy={selectedVacancy} />
          </div>
        ) : null}
      </div>

    </>
  );
}