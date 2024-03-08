import { useRef, useEffect } from "react";

function useOutsideClick(handle: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as HTMLElement)) {
        console.log("outside");
        handle();
      }
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return { ref };
}

export default useOutsideClick;
