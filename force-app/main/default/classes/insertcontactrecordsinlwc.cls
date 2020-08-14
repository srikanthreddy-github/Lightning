public with sharing class insertcontactrecordsinlwc {
    @AuraEnabled
    public static void insertCon(QSAInputForm__c con){ 
        try{  
            insert con; 
        }catch(Exception e){
            System.debug('--->'+e);
        }
         System.debug('Con '+con); 
    }   
}
