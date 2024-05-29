const finderIndex = (array, value) => {
    let indices =[];

    for (let i = 0; i < array.length; i++) {
        const itemGroup = list[i];
        
        if (array[i].groupName === groupName) {
          return indices;
        } else if (Array.isArray(itemGroup)) {
          const subIndices = buscarItem(itemGroup, nombre);
          
          if (subIndices) {
            indices.push(i); // Agregar el índice de la lista principal
            return [...indices, ...subIndices]; // Concatenar los índices para devolverlos
          }
        }
      }
      
      return null;
}