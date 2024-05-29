const ColorSquare = ({ color, options = null, value='value', code='label' }) => {
    

    const colorOptions = options 
    const selectedColor = colorOptions ? colorOptions.find((item) => item?.[value] === color): null

    return (<>
        <div class="o_colorlist  flex-wrap  mw-100 gap-2">
            <button type="button" className={`btn p-0 mr-1 rounded-0 o_colorlist_toggler ${
                options ? ` bg-[#${selectedColor?.[code]}] ` : ` o_colorlist_item_color_${color}`
            }`}>

            </button>
        </div>

    </>)

}

export default ColorSquare;