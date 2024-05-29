import RadioButtonControlled from "@/components/tools/inputs/radio-button-controlled";

export function GeneralTopTitle({ control, errors, editConfig, frmState,options }) {
    return (
      <>
        <RadioButtonControlled
          name={"modal_contact"}
          control={control}
          errors={errors}
          options={options}
          editConfig={{ frmState, config: editConfig }}
        />
      </>
    );
  }