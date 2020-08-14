public class QSA_Apex {
@AuraEnabled
    public static void createQSA(QSAInputForm__c QSA){
        System.debug('..........'+QSA);
        insert QSA; 
    }
    @AuraEnabled
    public static  List<QSAInputForm__c> getQSA(String searchkeyword){
       String searchkey = searchkeyword +'%';
        
        list<QSAInputForm__c> acc = [SELECT id, Address_Number__c,Account_Company_Name__c,Email__c,Phone__c 
        
                                     FROM QSAInputForm__c where Address_Number__c Like : searchkey];
                System.debug('acc>>>>>>>>>>>>>>>'+ acc);

        return acc;
    }
}