import { ContactOption } from '../../contact.const';
import { AddressFormMiddleLeft } from '../add-contact/middle-left';
import { ModalContactMiddleLeft } from './components/middle-left';


export const GeneralMiddleLeft = ({control, errors, watch, setValues, editConfig, frmState}) => {
  
    const getComponent = () => {
        switch (watch('modal_contact')) {
          case ContactOption.ADD_CONTACT:
            return <AddressFormMiddleLeft setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig} />;
          default:
            return <ModalContactMiddleLeft setValues={setValues} watch={watch} control={control} frmState={frmState} errors={errors} editConfig={editConfig}/>;
        }
      };
    return getComponent()
    
}
