// components/SearchBox/SearchBox.tsx

import css from './SearchBox.module.css';

interface SearchBoxProps {
   query: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ query }: SearchBoxProps) {
   return (
      <input
         className={css.input}
         type="text"
         placeholder="Search notes"
         onChange={query}
      />
   );
}
