import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react";
import CustomTabPanel from "./custom_tab_panel";

const CustomTabs = ({ list, watch, control, errors, setValues, editConfig }) => {
    const [value, setValue] = useState(0);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
    <Box sx={{ width: "100%" }} className="tabEx">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
                {
                list.map((tab, index) => {
                    return (
                        <Tab
                            label={
                                <Typography fontSize={"14.4px"}
                                    sx={{ textTransform: "none" }}>
                                    {tab?.name}
                                </Typography>}
                            {...a11yProps(index)}
                            key={index}
                        />
                    )
                })
                }
            </Tabs>
        </Box>
        {
        list.map((tab, i) => {
            return (
                <CustomTabPanel key={i} value={value} index={i}>
                    <div className="w-full">
                        {tab?.content && tab.content(watch, control, errors, setValues, editConfig)}
                    </div>
                </CustomTabPanel>
            )
        })
        }
    </Box>
    )}

export default CustomTabs