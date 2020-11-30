public with sharing class TeamController {

	@AuraEnabled(cacheable=true)
	public static List<Team__c> getAllTeams() {
		return [SELECT Id, Name FROM Team__c ORDER BY Name];
	}

	@AuraEnabled(cacheable=true)
	public static List<Team_Member__c> getAllTeamMembers(String selectedTeamId) {
		if(String.isBlank(selectedTeamId)) {
			return [
				SELECT Name, Team__r.Name, Skills__c
				FROM Team_Member__c
			];
		}
		return [
			SELECT Name, Team__r.Name, Skills__c
			FROM Team_Member__c
			WHERE Team__c = :selectedTeamId
		];
	}
}
