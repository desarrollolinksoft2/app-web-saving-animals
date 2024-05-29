import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function MenuComponent({ items }) {
  const [anchorEl, setAnchorEl] = React.useState({});

  const handleClick = (event, index) => {
    setAnchorEl({ ...anchorEl, [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    setAnchorEl({ ...anchorEl, [index]: null });
  };

  const renderMenu = (item, index) => (
    <div key={index}>
      <button onClick={(event) => handleClick(event, index)}>
        {item.nombre}
      </button>
      <Menu
        anchorEl={anchorEl[index]}
        open={Boolean(anchorEl[index])}
        onClose={() => handleClose(index)}
      >
        {item.opciones.map((opcion, i) => {
          if (opcion.submenu) {
            return renderMenu(opcion, `${index}-${i}`);
          }
          return (
            <MenuItem key={i} onClick={() => handleClose(index)}>
              {opcion.nombre}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );

  return <div>{items.map(renderMenu)}</div>;
}

export default MenuComponent;
