import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Pesquise artistas ou eventos"
          aria-label="Pesquisar"
          className="h-12 w-full rounded-full bg-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>
      <button
        type="button"
        className="h-12 shrink-0 rounded-full bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        Pesquisar
      </button>
    </div>
  );
};

export default SearchBar;
