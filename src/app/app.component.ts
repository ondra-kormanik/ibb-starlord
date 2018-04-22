import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SlackChannelHistoryMessage, SlackService, SlackUserInfo} from '../domain/read-slack/slack.service';
import {MatTableDataSource} from '@angular/material';
import {TranslationService} from '../domain/translate-data/translation.service';
import {Recipient, SendersResult, StarCounterService} from '../domain/count-stars/star-counter.service';
import {forEach} from 'lodash';

export interface TableRow {
    user: string;
    type: string;
    text: string;
    ts: string;
}

export interface DisplayedSenderResult {
    sender: string;
    recipients: Array<Recipient>;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public tokenFormGroup: FormGroup;
    public historyFormGroup: FormGroup;
    public data: MatTableDataSource<Array<TableRow>>;
    public displayedColumns = ['type', 'user', 'text', 'ts'];
    public showTable = false;
    public showSpinner = false;
    public sendersResult: SendersResult;
    public sendersResultAsArray: Array<DisplayedSenderResult>;
    public userListIsLoaded = false;
    private userList: any;
    private userToken: string;

    constructor(private formBuilder: FormBuilder,
                private slackService: SlackService,
                private translationService: TranslationService,
                private starCounterService: StarCounterService) {
    }

    public ngOnInit() {
        this.prepareTokenForm();
        this.prepareHistoryForm();
    }

    public prepareHistoryForm() {
        this.historyFormGroup = this.formBuilder.group({
            historyFrom: new Date(),
            historyTo: new Date()
        });
    }

    public readHistory() {
        this.showTable = false;
        this.showSpinner = !this.showTable;

        const from: Date = this.historyFormGroup.controls.historyFrom.value;
        const to: Date = this.historyFormGroup.controls.historyTo.value;

        this.slackService.readChannelHistory(this.userToken, from, to).subscribe((messages: Array<SlackChannelHistoryMessage>) => {
            const filteredMessages = messages.filter((message) => message.user && message.type === 'message');
            this.countStarsFromSenders(filteredMessages);
            const translatedHistoryMessages: any = this.translationService.getTranslationOfMessages(filteredMessages, this.userList);
            this.data = new MatTableDataSource(translatedHistoryMessages);
            this.showTable = true;
            this.showSpinner = !this.showTable;
        });
    }

    private loadUsersList(): void {
        this.slackService.readUsersInfo(this.userToken).subscribe((userList: Array<SlackUserInfo>) => {
            this.userList = userList;
            this.userListIsLoaded = true;
        });
    }

    private countStarsFromSenders(list: Array<SlackChannelHistoryMessage>): void {
        this.sendersResult = this.starCounterService.countSenders(list);
        this.sendersResultAsArray = this.translationService.getTranslationOfResults(this.sendersResult, this.userList);
        // this.sendersResultAsArray = this.makeIterable(this.sendersResult.listOfSenders);
    }

    private prepareTokenForm() {
        this.loadTokenIfExist();
        this.watchToken();
    }

    private makeIterable(data: any): Array<DisplayedSenderResult> {
        const result = [];
        forEach(data, (item: any, propertyName) => {
            result.push({sender: propertyName, recipients: item});
        });
        return result;
    }

    private loadTokenIfExist() {
        // load saved token or nothing
        this.tokenFormGroup = this.formBuilder.group({
            token: ''
        });
    }

    private watchToken() {
        this.tokenFormGroup.valueChanges.subscribe((data: any) => {
            this.userToken = data.token;
            this.loadUsersList();
        });
    }
}
