public with sharing class QSA_lwc { 
    @AuraEnabled
    public static QSAInputForm__c createQSA(QSAInputForm__c acc) {
        system.debug('acc'+acc);
        insert acc;
        return acc; 
    }
    
}