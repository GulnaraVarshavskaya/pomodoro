import { useEffect, useRef } from "react";

export function useOutsideClick(callback, dependencies) {
    const ref = useRef();
    useEffect(() => {
      const handleClick = (event) => {
        const isRefBeingUsed = Boolean(ref.current);
        const isClickOutsideElement = !ref.current?.contains(event.target);
        if (isRefBeingUsed && isClickOutsideElement) {
          callback(event);
        }
      };
  
      document.addEventListener("click", handleClick, true);
  
      return () => {
        document.removeEventListener("click", handleClick, true);
      };
    }, [ref, ...dependencies]);

    return ref;
  }