import { useEffect } from "react"

import { useRef } from "react"

export function ClickOutside({ children, onClickOutside, ignoreClass }: { children: React.ReactNode, onClickOutside: () => void, ignoreClass?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      const hasIgnoreClass = (element: HTMLElement | null): boolean => {
        if (!element) return false;
        if (element.classList.contains(ignoreClass ?? '')) return true;
        return hasIgnoreClass(element.parentElement);
      };

      if (ref.current && !ref.current.contains(target) && !hasIgnoreClass(target)) {
        onClickOutside()
      }
    }

    document.addEventListener("click", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [onClickOutside, ignoreClass])

  return <div ref={ref}>{children}</div>
}