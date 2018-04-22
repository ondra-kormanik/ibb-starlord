import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface SlackChannelHistoryMessage {
    type: string;
    user: string;
    text: string;
    ts: string;
}

export interface SlackUserInfo {
    id: string;
    team_id: string;
    name: string;
    real_name: string;
}

@Injectable()
export class SlackService {
    public readonly baseUrl = 'https://slack.com';

    constructor(private http: HttpClient) {
    }

    public readUsersInfo(token: string): Observable<Array<SlackUserInfo>> {
        const result = this.http.get(this.baseUrl + '/api/users.list' + '?token=' + token + '&channel=C2KJ0KRJS&pretty=1');

        return result.map((slackData: any) => {
            return slackData.members.map((member) => {
                return {
                    id: member.id,
                    team_id: member.team_id,
                    name: member.name,
                    real_name: member.real_name
                };
            });
        });
    }

    public readChannelHistory(token: string, from: Date, to: Date): Observable<Array<SlackChannelHistoryMessage>> {
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);

        const oldest = from.getTime() / 1000;
        const latest = to.getTime() / 1000;

        const data: Observable<any> = this.http.get(this.baseUrl + '/api/channels.history' + '?token=' + token + '&channel=C2KJ0KRJS' +
            '&oldest=' + oldest + '&latest=' + latest + '&pretty=1');
        return data.map((d) => d.messages);
    }
}
