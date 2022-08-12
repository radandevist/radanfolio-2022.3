import { useState, useEffect } from "react";

export type Media = `(min-width: ${number}px)` | `(max-width: ${number}px)`;

export const useMediaQuery = (query: Media) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};
