import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function MenuComponent({ items }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, index) => {
    setAnchorEl({ [index]: event.currentTarget });
  };

  const handleClose = (index) => {
    setAnchorEl({ ...anchorEl, [index]: null });
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button onClick={(event) => handleClick(event, index)}>
            {item.title}
          </button>
          <Menu
            anchorEl={anchorEl[index]}
            open={Boolean(anchorEl[index])}
            onClose={() => handleClose(index)}
          >
            {item.opciones.map((opcion, i) => (
              <MenuItem key={i} onClick={() => handleClose(index)}>
                {opcion}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ))}
    </div>
  );
}

export default MenuComponent;
