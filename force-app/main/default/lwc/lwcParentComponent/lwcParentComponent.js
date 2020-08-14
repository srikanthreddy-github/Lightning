import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handleChangeEvent(event){
        this.template.querySelector('c-eventsusingmethodsin-Lwc').changeMessage(event.target.value);
    }
}