import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eraser } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  search: string;
  setSearch: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
}

export const SearchFilter = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  resetFilters,
  setCurrentPage,
}: SearchFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-white text-base"
      />

      <Select
  onValueChange={(value) => {
    setTypeFilter(value === "all" ? "" : value);
    setCurrentPage(1);
  }}        value={typeFilter}
      >
        <SelectTrigger className="w-full bg-white cursor-pointer text-base md:text-sm">
          <SelectValue placeholder="Filtrar por tipo" />
        </SelectTrigger>
        <SelectContent >
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="normal">Normal</SelectItem>
          <SelectItem value="fire">Fuego</SelectItem>
          <SelectItem value="water">Agua</SelectItem>
          <SelectItem value="grass">Planta</SelectItem>
          <SelectItem value="electric">Eléctrico</SelectItem>
          <SelectItem value="ice">Hielo</SelectItem>
          <SelectItem value="fighting">Lucha</SelectItem>
          <SelectItem value="poison">Veneno</SelectItem>
          <SelectItem value="ground">Tierra</SelectItem>
          <SelectItem value="flying">Volador</SelectItem>
          <SelectItem value="psychic">Psíquico</SelectItem>
          <SelectItem value="bug">Bicho</SelectItem>
          <SelectItem value="rock">Roca</SelectItem>
          <SelectItem value="ghost">Fantasma</SelectItem>
          <SelectItem value="dragon">Dragón</SelectItem>
          <SelectItem value="dark">Siniestro</SelectItem>
          <SelectItem value="steel">Acero</SelectItem>
          <SelectItem value="fairy">Hada</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={resetFilters}
        className="cursor-pointer font-black text-base hover:bg-white hover:text-neutral-800 transition-colors duration-300"
      >
        <Eraser />
        Reset
      </Button>
    </div>
  );
};
