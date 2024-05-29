import useAppStore from "@/store/zustand";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// ---------------------------------------------- inicio
import * as React from "react";
// import Button from "@mui/material/Button";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// ---------------------------------------------- fin

// ---------------------------------------------- inicio
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
// ---------------------------------------------- fin

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const MultiDialog = () => {
  const appDialogs = useAppStore((state) => state.appDialogs);
  const setAppDialogs = useAppStore((state) => state.setAppDialogs);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const frmDialogLoading = useAppStore((state) => state.frmDialogLoading);
  const setFrmDialogLoading = useAppStore((state) => state.setFrmDialogLoading);

  // const handleOpenDialog = () => {
  //     setAppDialogs([...appDialogs, { open: true }]);

  // }

  const handleConfirm = (dialog) => {
    // console.log(dialog)
    if (dialog?.onConfirm) {
      dialog.onConfirm(dialog);
    }
  };

  const handleCloseDialog = (index) => {
    // console.log('cerrar dialogo')
    // console.log(index)
    // console.log(appDialogs)
    let listDialogs = appDialogs.filter((dialog, i) => i !== index);
    setAppDialogs(listDialogs);
  };

  const actions = (dialog) => {
    // console.log(dialog)
    switch (dialog.type) {
      case "form":
        return (
          <button
            disabled={frmDialogLoading}
            onClick={() => handleConfirm(dialog)}
            type="button"
            className="btn btn-primary o_form_button_save"
          >
            {" "}
            Guardar y cerrar
          </button>
        );
      // break;
      default:
        return (
          <button
            disabled={frmDialogLoading}
            onClick={() => handleConfirm(dialog)}
            type="button"
            className="btn btn-primary o_form_button_save"
          >
            {" "}
            Nuevo
          </button>
        );
    }
  };

  useEffect(() => {
    setFrmDialogLoading(false);
  }, [appDialogs.length]);

  return (
    <>
      {/* <button onClick={handleOpenDialog}>Open Dialog</button> */}
      {appDialogs.map((dialog, index) => {
        return (
          <Dialog
            key={index}
            open={dialog.open} //open={open}
            onClose={() => handleCloseDialog(index)} //onClose={handleClose}
            fullScreen={fullScreen}
            maxWidth={"md"}
            scroll={"paper"} //{scroll}
            PaperComponent={PaperComponent}
            className="modal o_technical_modal"
          >
            <DialogTitle
              id="draggable-dialog-title"
              // style={{ cursor: 'move' }}
              className="ModalDialogTitle"
            >
              {dialog.title}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => handleCloseDialog(index)}
              sx={{
                position: "absolute",
                right: 6,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <DialogContent
              dividers={true}
              sx={{ padding: 0 }}
              // sx={{ padding: 0, overflow: 'initial' }}
              // className="h-60vh"
              className="modal-dialog"
            >
              {dialog.content(()=>handleCloseDialog(index))}
            </DialogContent>

            <DialogActions
            className="modal-footer"
            >
              {/* <div className="o_form_buttons_edit d-flex gap-1"> */}
              <div className="o_form_buttons_edit d-flex">
                {actions(dialog)}
                <button
                  disabled={frmDialogLoading}
                  onClick={() => handleCloseDialog(index)}
                  type="button"
                  className="btn btn-secondary o_form_button_cancel"
                >
                  {dialog.type === "form" ? "Descartar" : "Cerrar"}
                </button>
              </div>
            </DialogActions>
          </Dialog>
        );
      })}
    </>
  );
};

export default MultiDialog;
