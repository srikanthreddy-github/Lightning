public class PickListController {
    @AuraEnabled        
    public static List<String> getPickListValuesIntoList(String objectType, String selectedField){
        List<String> pickListValuesList = new List<String>();
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
        List<Schema.PicklistEntry> pickListEnterValuesList = fieldResult.getPicklistValues();
        pickListValuesList.add('-None-');
        for( Schema.PicklistEntry pickListVal : pickListEnterValuesList){
            pickListValuesList.add(pickListVal.getLabel());
        }    
        return pickListValuesList;
    }
   
}