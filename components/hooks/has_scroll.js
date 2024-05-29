import { useState, useEffect, useRef } from 'react';

function useHasScroll(divRef) {
//   const divRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    function checkScroll() {
      const div = divRef.current;
      if (div) {
        // const hasHorizontalScroll = div.scrollWidth > div.clientWidth;
        const hasVerticalScroll = div.scrollHeight > div.clientHeight;
        setHasScroll(hasVerticalScroll);
      }
    }

    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [divRef]);

  return [divRef, hasScroll];
}

export default useHasScroll;