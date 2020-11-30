import { LightningElement, api, track, wire } from 'lwc';
import getAllTeams from '@salesforce/apex/TeamController.getAllTeams';
import getAllTeamMembers from '@salesforce/apex/TeamController.getAllTeamMembers';
import { refreshApex } from '@salesforce/apex';
import NAME_FIELD from '@salesforce/schema/Team_Member__c.Name__c';
import TEAM_FIELD from '@salesforce/schema/Team_Member__c.Team__c';
import SKILLS_FIELD from '@salesforce/schema/Team_Member__c.Skills__c';

const FIELDS = [
	NAME_FIELD,
	TEAM_FIELD,
	SKILLS_FIELD,
];
export default class TeamList extends LightningElement {
	FIELDS = FIELDS;
	error;
	selectedTeamId = '';
	teamMembers = undefined;
	@track teamOptions;

	@wire(getAllTeams)
	wiredAllTeams({ error, data }) {
		if (data) {
			this.teamOptions = data.map(team => 
				Object.assign({}, team, {label: team.Name, value: team.Id })
			);
			this.teamOptions.unshift({ label: 'All Teams', value: '' });
		} else if (error) {
			this.teamOptions = undefined;
			this.error = error;
		}
	}

	@wire(getAllTeamMembers, {selectedTeamId: '$selectedTeamId' })
	wiredTeamMembers(result) {
		if (result.data) {
			this.teamMembers = result.data;
			this.error = undefined;
			this.refresh();
		} else if (result.error) {
			this.error = result.error;
			this.teamMembers = undefined;
		}
	}

	@api
	async refresh() {
		await refreshApex(this.teamMembers);
	}

	handleTeamOptionsChange(event) {
		this.selectedTeamId = event.detail.value;
	}

}