// https://blog.openreplay.com/creating-a-table-of-content-widget-in-react

import { useEffect, useRef, useState } from "react";

export function useScrollSpy(
  ids,
  options
) {
  const [activeId, setActiveId] = useState();
  const observer = useRef();
  useEffect(() => {
    const elements = ids.map((id) =>
      document.getElementById(id)
    );
    observer.current?.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);
    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });
    return () => observer.current?.disconnect();
  }, [ids, options]);
  return activeId;
}