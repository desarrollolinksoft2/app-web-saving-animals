export const updateColSize=(columns, propName, key, widthScreen, extraWidth=0) =>{
    let totalSize = 0;
  
    columns?.forEach(column => {
      if(column[propName]===key) return;
      totalSize += column.size;
    });
  
    var newSize = widthScreen-(totalSize + extraWidth);
    if(newSize<0) newSize = 100;

    let nColumns = columns?.map(column => {
      if (column[propName] === key) {
        return { ...column, size: newSize };
      } else {
        return column;
      }
    });
    return nColumns;
  }

export default updateColSize;