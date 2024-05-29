import IndeterminateCheckbox from "./indeterminate_checkbox";
import { Dropdown, MenuButton,Menu, MenuItem } from "@mui/base";
import { GiSettingsKnobs } from "react-icons/gi";
import { LuSettings2 } from "react-icons/lu";

const gridListColumns = (columns, col_name) => {
    return [
        {
            id: 'select',
            header: ({ table }) => {
                return (<>
                    <div className="w-full flex justify-center">
                        <IndeterminateCheckbox
                            {...{
                                className: "accent-sgreen-400 ",
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange: table.getToggleAllRowsSelectedHandler()//getToggleAllPageRowsSelectedHandler()//getToggleAllRowsSelectedHandler(),
                            }}
                        />
                    </div>
                </>)
            },
            cell: ({ row }) => (
                <div className="px-1 flex justify-center" >
                    <IndeterminateCheckbox
                        {...{
                            className: "accent-sgreen-400 ",
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                </div>
            ),
            enableSorting: false,
            size: 40,
            maxSize: 40,
        },
        ...columns,
        {
            id: 'settings',
            header: ({ table }) => {
                return (<>
                    <Dropdown>
                        {/* <MenuButton><GiSettingsKnobs /></MenuButton> */}
                        <MenuButton><LuSettings2 /></MenuButton>
                        <Menu>
                            {table.getAllLeafColumns().map((column, i) => {
                                if (column.id === "select" || column.id === col_name || column.id === 'settings')
                                    return null;
                                return (<>
                                    <MenuItem key={i}>
                                        <div className="group p-1 gap-3">
                                            <label className="flex g ml-2 font-medium cursor-pointer gap-3 ">
                                                <input
                                                    className={`m-1 group-hover:bg-sgreen-400 group-hover:text-sgreen-200 cursor-pointer accent-sgreen-400 ${column.getIsVisible()
                                                        ? ` text-sgreen-400`
                                                        : ` bg-gray-100`
                                                        }`}
                                                    {...{
                                                        type: "checkbox",
                                                        checked: column.getIsVisible(),
                                                        onChange:
                                                            column.getToggleVisibilityHandler(),
                                                    }}
                                                />
                                                {column.columnDef.header}
                                            </label>
                                        </div>
                                    </MenuItem>
                                </>)
                            })
                            }
                        </Menu>
                    </Dropdown>

                </>)
            },
            cell: ({ row }) => (' '),
            enableSorting: false,
            size: 40,
            maxSize: 40,
        }
    ]
}

export default gridListColumns;