'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface Character {
  id: string;
  name: string;
}

export default function Search({ placeholder }: { placeholder: string }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // 🧠 Manejo de búsqueda con debounce
  const handleSearch = useDebouncedCallback(async (term: string) => {
    setQuery(term);
    const params = new URLSearchParams(searchParams);
    if (term) params.set('query', term);
    else params.delete('query');
    replace(`${pathname}?${params.toString()}`);

    if (!term.trim()) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/search?query=${encodeURIComponent(term)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // 🔒 Cierra el dropdown si se hace clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        handleCloseDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🧹 Limpia todo al cerrar
  const handleCloseDropdown = () => {
    setShowDropdown(false);
    setQuery('');
    setResults([]);
    if (inputRef.current) {
      inputRef.current.value = '';
      replace(`${pathname}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full my-3 font-ne relative z-50">
      <input
        ref={inputRef}
        className="bg-[rgba(0,0,0,0.4)] lg:w-2/5 w-3/5
        rounded-xl text-center text-sm placeholder:text-white text-white font-normal
        backdrop-blur-sm py-3
        outline-none border-none appearance-none ring-0 border-transparent
        focus:border-transparent focus:border-none focus:ring-0 focus:outline-none z-10 peer 
        transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
        focus:scale-105 focus:shadow-black focus:shadow-lg active:scale-95"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <AnimatePresence>
        {showDropdown && results.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-[44px] bg-[rgba(0,0,0,0.4)] 
            w-[60%] lg:w-2/5 rounded-b-xl 
            max-h-[245px] overflow-y-auto backdrop-blur-md 
            border-none shadow-lg no-scrollbar"
          >
            <div className="py-3 px-3 space-y-4">
              {/* --- Movies --- */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h1 className="text-center text-sm uppercase tracking-wider text-white/80 mb-2 font-semibold">
                  Movies
                </h1>
                <div className="rounded-xl overflow-hidden divide-y divide-white/10 bg-white/5">
                  {results.map((character, index) => (
                    <motion.div
                      key={`movie-${character.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.05,
                        ease: 'easeOut',
                      }}
                    >
                      <Link
                        href={`protected/movies/${character.id}`}
                        onClick={handleCloseDropdown}
                        className="flex items-center py-3 px-3 hover:bg-white/10 transition duration-200"
                      >
                        <span className="text-white text-sm text-center font-medium">
                          {character.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* --- Comics --- */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
              >
                <h1 className="text-center text-sm uppercase tracking-wider text-white/80 mb-2 font-semibold">
                  Comics
                </h1>
                <div className="rounded-xl overflow-hidden divide-y divide-white/10 bg-white/5">
                  {results.map((character, index) => (
                    <motion.div
                      key={`comic-${character.id}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.05 + 0.2,
                        ease: 'easeOut',
                      }}
                    >
                      <Link
                        href={`protected/comics/${character.id}`}
                        onClick={handleCloseDropdown}
                        className="flex items-center py-3 px-3 hover:bg-white/10 transition duration-200"
                      >
                        <span className="text-white text-sm font-medium">
                          {character.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
