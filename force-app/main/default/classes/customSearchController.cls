public with sharing class customSearchController {
  
    @AuraEnabled(cacheable=true)
     public static list<QSAInputForm__c> getContactList(string searchKey) {
       //  string sTempSearchKey = '%' + searchKey + '%';
         
        // create contact list to store search result 
         list<QSAInputForm__c> lstContact = new list<QSAInputForm__c>();
      
        // query contact records
         for(QSAInputForm__c oCon : [Select id,Name,Email__c,First_Name__c,Last_Name__c,Phone__c
                             From QSAInputForm__c
                             WHERE name = : searchKey]){
            lstContact.add(oCon);
         }
         
        //If there are no records found with searchKey then, throw aura exception with a message
          if(lstContact.size() == 0){
             throw new AuraHandledException('No Record Found..'); 
          }
          
         return lstContact;
     }
 }