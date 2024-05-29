import { Tooltip, styled, tooltipClasses } from "@mui/material"


const TooltipCustom =styled(({className, ...props})=>(
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));
export default TooltipCustom