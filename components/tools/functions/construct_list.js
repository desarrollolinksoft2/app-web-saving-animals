// const paginatedGroups =(group, page, rowsPerPage)=>{
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;
//     return group.slice(start, end);

// } 
const constructList = (list, rowsPerPage) => {
    // console.log(list)
    // const nlist = groups.map((item)=>{
    //     list[item.groupName].groupItems= paginatedGroups(list[item.name].groupItems, item.currentPage, rowsPerPage)
    // })

    // for (const item in list){
    //      item.groupItems = paginatedGroups(item.groupItems, item.currentPage, rowsPerPage)
    // }

    const nList = list.map((item)=>{
        const start = ((item.currentPage || 1) - 1) * rowsPerPage ;
        const end = start + rowsPerPage;
        const itemsPaginated= item.groupItems? item.groupItems.slice(start, end) : [];
        // console.log(start)
        // console.log(end)
        if(isNaN(start) || isNaN(end)){
            console.log(item.currentPage)
            console.log(rowsPerPage)
            console.log(list)
        }
        return {...item,
            // pages: item.groupItems.length> rowsPerPage ? Math.ceil(item.groupItems.length / rowsPerPage):0, //grupos[valorCategoria].pages = Math.ceil(grupos[valorCategoria].groupItems.length / rowsPerPage);
            first: start+1,
            last: item.groupItems ? Math.min(end, item.groupItems.length) : 0,
            groupItems : itemsPaginated//paginatedGroups(item.groupItems, item.currentPage, rowsPerPage)
        }
    })

    return nList;

}

export default constructList;