import { LightningElement, track,wire} from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/QSAInputForm__c';
import NAME_FIELD from '@salesforce/schema/QSAInputForm__c.Name';
import INDUSTRY_FIELD from '@salesforce/schema/QSAInputForm__c.Address_Number__c';
import PHONE_FIELD from '@salesforce/schema/QSAInputForm__c.Phone__c';
import Source_FIELD from '@salesforce/schema/QSAInputForm__c.Source__c';
import Add_Billing_Address_field from '@salesforce/schema/QSAInputForm__c.Add_Billing_Address__c';
import CHECKBOX_FIELD from '@salesforce/schema/QSAInputForm__c.Add_Task__c';
import createQSA from '@salesforce/apex/QSA_lwc.createQSA';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import fatchPickListValue from '@salesforce/apex/getPickListValueInLwcCtrl.fatchPickListValue';
export default class CreateRecordWithFieldIntigrity extends LightningElement {
    
    @track name = NAME_FIELD;
    @track Addressnumber = INDUSTRY_FIELD;
    @track Phone = PHONE_FIELD;
    @track source = Source_FIELD;
    @track AddbillingAddress = Add_Billing_Address_field;
    @track checkbox = CHECKBOX_FIELD;
    @wire(fatchPickListValue, {objInfo: {'sobjectType' : 'QSAInputForm__c'},
    picklistFieldApi: 'Source__c'}) stageNameValues;
    rec = {
        Name : this.name,
        Address_Number__c : this.Addressnumber,
        Phone__c : this.Phone,
        Source__c : this.source,
        Add_Billing_Address__c : this.AddbillingAddress,
        Add_Task__c : this.checkbox
    }
    handCheckChange(event) {
        this.rec.Add_Task__c = event.target.checked;
        console.log("Add_Task__c", this.rec.Add_Task__c);
    }
    handleNameChange(event) {
        this.rec.Name = event.target.value;
        console.log("name1", this.rec.Name);
    }
    onValueSelection(event){
        // eslint-disable-next-line no-alert
        this.rec.Source__c =event.target.value;
        alert(this.rec.Source__c);
       }  
       handleCheckBoxChange(event){
        this.rec.Add_Billing_Address_field = event.target.checked;
        alert(this.rec.Add_Billing_Address_field);
    }
    
    handleIndChange(event) {
        this.rec.Address_Number__c = event.target.value;
        console.log("Industry", this.rec.Address_Number__c);
    }
    
    handlePhnChange(event) {
        this.rec.Phone__c = event.target.value;
        console.log("Phone", this.rec.Phone__c);
    }

    handleClick() {
        createQSA({ acc : this.rec })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.rec.Name = '';
                    this.rec.Address_Number__c = '';
                    this.rec.Phone__c = '';
                    this.rec.Add_Task__c = '';
                    this.rec.Source__c = '';
                   this.rec.Add_Billing_Address__c = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                        }),
                    );
                }
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
    }
}
