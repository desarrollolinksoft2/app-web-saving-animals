'use client'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Typography } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { BsExclamationCircle } from "react-icons/bs";
import useAppStore from "@/store/zustand";

const DialogMessage = () => {

  const appDialog = useAppStore((state) => state.appDialog);
  const setAppDialog = useAppStore((state) => state.setAppDialog);
  // const frmDialogAction = useAppStore((state) => state.frmDialogAction);
  const setFrmDialogAction = useAppStore((state) => state.setFrmDialogAction);
  const frmDialogLoading = useAppStore((state) => state.frmDialogLoading);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const onConfirm = async () => {
    if (appDialog.handleConfirm !== null) {
      await appDialog.handleConfirm();
      setAppDialog({ ...appDialog, open: false });
      return;
    }
    setAppDialog({ ...appDialog, open: false });
  };

  const handleSave = () => {
    setFrmDialogAction('save')
  }

  const handleClose = () => {
    // if(appDialog.handleCancel!==null){
    //   appDialog.handleCancel()
    // }
    setAppDialog({ ...appDialog, open: false });
  }

  return (
    <>
      <Dialog sx={{overflow: 'initial' }} fullScreen={fullScreen} maxWidth={appDialog.isForm && 'md'} open={appDialog.open} onClose={handleClose}>
        {appDialog.isForm ? (<>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {appDialog.title}
          </DialogTitle>
        </>)
          : (<>
            <DialogContent>
              <div className="w-full my-5" style={{ textAlign: "-webkit-center" }}>
                <BsExclamationCircle
                  style={{ fontSize: "100px" }}
                  className="text-lred dark:text-bred"
                />
              </div>
              <DialogContentText className="mb-5 text-black dark:text-white font-medium text-center text-2xl">

                {appDialog.title}
              </DialogContentText>
            </DialogContent>
          </>)
        }

        <DialogContent sx={{ padding: 0, overflow: 'initial'  }} className="h-60vh">
          {appDialog.content}
        </DialogContent>
        {appDialog.isForm ? (<>
          <DialogActions>
            <div className="o_form_buttons_edit d-flex gap-1">
              {
                appDialog.listSearch ? (<>
                  <button disabled={frmDialogLoading} onClick={handleSave} type="button" className="btn btn-primary o_form_button_save"> Nuevo</button>
                  <button disabled={frmDialogLoading} onClick={handleClose} type="button" className="btn btn-secondary o_form_button_cancel"> Cerrar</button>
                </>) : (<>
                  <button disabled={frmDialogLoading} onClick={handleSave} type="button" className="btn btn-primary o_form_button_save"> Guardar y cerrar</button>
                  <button disabled={frmDialogLoading} onClick={handleClose} type="button" className="btn btn-secondary o_form_button_cancel"> Descartar</button>
                </>)
              }

            </div>
          </DialogActions>
        </>) : (<>
          <DialogActions>
            {appDialog.actions ? (
              <>
                <div className="w-full grid_native grid-flow-col justify-stretch">
                  <Button sx={{ paddingX: 2 }} onClick={handleClose}>
                    <Typography fontSize={"16px"} sx={{ textTransform: "none" }}>
                      ¡No, cancelar!
                    </Typography>
                  </Button>
                  <Button
                    className="text-lred dark:text-bred"
                    sx={{ paddingX: 2 }}
                    onClick={onConfirm}
                    autoFocus
                  >
                    <Typography fontSize={"16px"} sx={{ textTransform: "none" }}>
                      {appDialog.textConfirm ? appDialog.textConfirm : '¡Si, elimínalo!'}
                    </Typography>
                  </Button>
                </div>
              </>
            ) : (
              <div className="w-full grid_native grid-flow-col justify-stretch">
                <Button sx={{ paddingX: 2 }} onClick={handleClose}>
                  <Typography fontSize={"16px"} sx={{ textTransform: "none" }}>
                    ¡No, cancelar!
                  </Typography>
                </Button>
              </div>
            )}
          </DialogActions>
        </>)}

      </Dialog>

    </>
  );
};

export default DialogMessage;
