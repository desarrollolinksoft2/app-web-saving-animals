function groupItems(lista, categoria, rowsPerPage, level=0) {
    
    if(!lista || !categoria || typeof lista === 'undefined') 
        return console.error('Error: No se ha recibido la lista o la categoría');

    const grupos = {};
      
    lista.forEach((objeto) => {
        const valorCategoria = objeto[categoria];
        if (!grupos[valorCategoria]) {
          grupos[valorCategoria] = {
            groupName: valorCategoria? valorCategoria:'Ninguno',
            groupItems: [],
            pages: 1,
            currentPage:1,
            totalItems: 0,
            level: level
          };
        }
        
        grupos[valorCategoria].groupItems.push(objeto);
        let isLastGroup =  grupos[valorCategoria].groupItems[0]?.groupItems ? false : true;
        grupos[valorCategoria].currentPage = 1;
        grupos[valorCategoria].totalItems = grupos[valorCategoria].groupItems.length;
        grupos[valorCategoria].pages = Math.ceil((isLastGroup ? grupos[valorCategoria].totalItems : grupos[valorCategoria].groupItems.length) / rowsPerPage);
        console.log(grupos[valorCategoria].pages)
        
      });
    
      return Object.values(grupos);
  }

  export default groupItems;