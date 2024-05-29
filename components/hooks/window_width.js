import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Solo ejecutar este código en el cliente
    if (typeof window !== 'undefined') {
      // Función de manejo para actualizar el estado con el nuevo ancho de la ventana
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Añadir el manejador de eventos al evento resize de la ventana
      window.addEventListener('resize', handleResize);

      // Llamar al manejador una vez al inicio para obtener el ancho inicial de la ventana
      handleResize();

      // Limpiar el manejador de eventos cuando el componente se desmonte
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []); // Vacío [] para que se ejecute solo una vez al montar

  return windowWidth;
}

export default useWindowWidth;