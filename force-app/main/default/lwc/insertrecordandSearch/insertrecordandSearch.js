import {  LightningElement, track } from 'lwc';
import {  ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertCon from '@salesforce/apex/insertcontactrecordsinlwc.insertCon';
import getContactList from '@salesforce/apex/customSearchController.getContactList';
import My_Resource from '@salesforce/resourceUrl/c2n';
import CONTACT_OBJECT from '@salesforce/schema/QSAInputForm__c';
export default class insertObject extends LightningElement {
@track contacts;
sVal = '';
@track conRecord = CONTACT_OBJECT;
c2n = My_Resource;
handleFirstNameChange(event) {
this.conRecord.First_Name__c = event.target.value;
window.console.log('First Name ==> ' + this.conRecord.First_Name__c);
}
handleNameChange(event) {
this.conRecord.Name = event.target.value;
window.console.log('First Name ==> ' + this.conRecord.Name);
}
updateSeachKey(event) {
this.sVal = event.target.value;
}

handleLastNameChange(event) {
this.conRecord.Last_Name__c = event.target.value;
window.console.log('Last Name ==> ' + this.conRecord.Last_Name__c);
}
handleAccountnumberChange(event) {
this.conRecord.Address_Number__c = event.target.value;
window.console.log('Last Name ==> ' + this.conRecord.Address_Number__c);
}
handlePhoneChange(event) {
this.conRecord.Phone__c = event.target.value;
window.console.log('Phone ==> ' + this.conRecord.Phone__c);
}
handleEmailChange(event) {
this.conRecord.Email__c = event.target.value;
window.console.log('Email ==> ' + this.conRecord.Email__c);
}
handleSearch() {
// if search input value is not blank then call apex method, else display error msg 
if (this.sVal !== '') {
getContactList({
        searchKey: this.sVal
    })
    .then(result => {
        // set @track contacts variable with return contact list from server  
        this.contacts = result;
    })
    .catch(error => {
        // display server exception in toast msg 
        const event = new ShowToastEvent({
            title: 'Error',
            variant: 'error',
            message: error.body.message,
        });
        this.dispatchEvent(event);
        // reset contacts var with null   
        this.contacts = null;
    });
} else {
// fire toast event if input field is blank
const event = new ShowToastEvent({
    variant: 'error',
    message: 'Search text missing..',
});
this.dispatchEvent(event);
}
}
createRec() {
window.console.log('In createRec ===> ');
insertCon({
    con: this.conRecord
})
.then(result => {
    // Clear the user enter values
    this.conRecord = {};
    window.console.log('result ===> ' + result);
    // Show success messsage
    this.dispatchEvent(new ShowToastEvent({
        title: 'Success!!',
        message: 'Contact Created Successfully!!',
        variant: 'success'
    }), );
})
.catch(error => {
    this.error = error.message;
});
}
}