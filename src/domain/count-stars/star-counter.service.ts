import {Injectable} from '@angular/core';
import {SlackChannelHistoryMessage} from '../read-slack/slack.service';
import {TextAnalyzer} from '../../utils/text-analyzer';
import {find} from 'lodash';

export interface SendersResult {
    totalCountOfSentStars: number;
    listOfSenders?: Senders;
}

export interface Senders {
    [senderId: string]: Array<Recipient>;
}

export interface Recipient {
    recipientId: string;
    numberOfStars: number;
}

@Injectable()
export class StarCounterService {

    private sendersResult: SendersResult;

    constructor() {
    }

    public countSenders(messageList: Array<SlackChannelHistoryMessage>): SendersResult {
        this.sendersResult = {
            totalCountOfSentStars: 0,
            listOfSenders: {}
        };
        messageList.forEach((message: SlackChannelHistoryMessage) => {
            let countOfStarsInMessage = 0;

            const messageTextLines = TextAnalyzer.splitTextIntoLines(message.text);
            messageTextLines.forEach((line: string) => {
                const idsInLine = this.findIdsInText(line);
                const countOfStars = this.countStarsInText(line);

                if (countOfStars > 0) {
                    const countOfStarsInLine = this.countStarsInText(line);
                    countOfStarsInMessage += idsInLine.length * countOfStarsInLine;
                    this.addStarsIntoListOfSenders(message.user, idsInLine, countOfStarsInLine);
                } else {
                    countOfStarsInMessage += idsInLine.length;
                    this.addStarsIntoListOfSenders(message.user, idsInLine, 1);
                }
            });

            this.sendersResult.totalCountOfSentStars += countOfStarsInMessage;
        });
        console.log(this.sendersResult);
        return this.sendersResult;
    }

    private addStarsIntoListOfSenders(senderId: string, recipientIds: Array<string>, numOfStars: number): void {
        const res = this.sendersResult;

        recipientIds.forEach((recipientId) => {
            let recipient: Recipient;
            if (res.listOfSenders[senderId]) {
                recipient = find<Recipient>(res.listOfSenders[senderId], {recipientId: recipientId});
            } else {
                res.listOfSenders[senderId] = [];
            }

            if (recipient) {
                recipient.numberOfStars += numOfStars;
            } else {
                res.listOfSenders[senderId].push({
                    recipientId: recipientId,
                    numberOfStars: numOfStars
                });
            }
        });
    }

    private countStarsInText(text: string): number {
        return TextAnalyzer.countStarsInText(text);
    }

    private findIdsInText(messageText: string): Array<string> {
        return TextAnalyzer.findIdsInText(messageText);
    }
}
