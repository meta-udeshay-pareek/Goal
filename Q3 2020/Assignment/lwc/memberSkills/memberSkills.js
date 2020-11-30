import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FIELDS from './constants';

export default class MemberSkills extends LightningElement {
	objectApiName = 'Team_Member__c';
	FIELDS = FIELDS;

	handleSuccess(event) {
		const evt = new ShowToastEvent({
			title: "Team Member Created",
			message: "Record ID: " + event.detail.id,
			variant: "success"
		});
		this.dispatchEvent(evt);
		this.dispatchEvent(new CustomEvent('refresh'));
	}
	handleError(event) {
		const evt = new ShowToastEvent({
			title: " Team Member creation Failed",
			message: "Failed ",
			variant: "error"
		});
		this.dispatchEvent(evt);
	}
}