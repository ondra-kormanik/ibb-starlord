import {Injectable} from '@angular/core';
import {SlackChannelHistoryMessage, SlackUserInfo} from '../read-slack/slack.service';
import {find, forEach} from 'lodash';
import {TextAnalyzer} from '../../utils/text-analyzer';
import {Recipient, SendersResult} from '../count-stars/star-counter.service';
import {DisplayedSenderResult} from '../../app/app.component';

@Injectable()
export class TranslationService {

    constructor() {
    }

    public getTranslationOfMessages(slackData: Array<SlackChannelHistoryMessage>, userList: Array<SlackUserInfo>): Array<SlackChannelHistoryMessage> {
        this.translateUsersInText(slackData, userList);

        return this.translateTime(this.translateUsers(slackData, userList));
    }

    public getTranslationOfResults(sendersResult: SendersResult, userList: Array<SlackUserInfo>): Array<DisplayedSenderResult> {
        const translation: Array<DisplayedSenderResult> = [];
        forEach(sendersResult.listOfSenders, (recipients: Array<Recipient>, propertyIdName: string) => {
            const sender = find(userList, {id: propertyIdName});

            const translatedRecipients: Array<Recipient> = [];
            recipients.forEach((item) => {
                const recipient = find(userList, {id: item.recipientId});
                translatedRecipients.push({
                    numberOfStars: item.numberOfStars,
                    recipientId: recipient.name
                });
            });
            translation.push({
                sender: sender.name,
                recipients: translatedRecipients
            });
        });

        return translation;
    }

    private translateTime(messages: Array<SlackChannelHistoryMessage>): Array<SlackChannelHistoryMessage> {
        messages.forEach((message: SlackChannelHistoryMessage) => {
            message.ts = new Date(parseInt(message.ts, 10) * 1000).toString();
        });

        return messages;
    }

    private translateUsersInText(messages: Array<SlackChannelHistoryMessage>, userList: Array<SlackUserInfo>): Array<SlackChannelHistoryMessage> {
        messages.forEach((message: SlackChannelHistoryMessage) => {
            const ids = this.findIdsInText(message);
            ids.forEach((id: string) => {
                const user: SlackUserInfo = find(userList, {id: id});

                message.text = message.text.replace(`<@${id}>`, `@${user.name}`);
            });
        });
        return messages;
    }

    private findIdsInText(message: SlackChannelHistoryMessage): Array<string> {
        return TextAnalyzer.findIdsInText(message.text);
    }

    private translateUsers(messages: Array<SlackChannelHistoryMessage>, userList: Array<SlackUserInfo>): Array<SlackChannelHistoryMessage> {
        messages.forEach((message: SlackChannelHistoryMessage) => {
            const user = find(userList, {id: message.user});
            message.user = user.name;
        });

        return messages;
    }
}
