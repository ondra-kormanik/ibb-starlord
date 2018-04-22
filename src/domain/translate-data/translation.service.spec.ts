import {TranslationService} from './translation.service';
import {SlackChannelHistoryMessage, SlackUserInfo} from '../read-slack/slack.service';

describe(TranslationService.name, () => {
    let historyData: Array<SlackChannelHistoryMessage>;
    let userInfoList: Array<SlackUserInfo>;
    let translationService: TranslationService;

    beforeEach(() => {
        translationService = new TranslationService();

        initData();
    });

    describe('getTranslationOfMessages', () => {
        let result: Array<SlackChannelHistoryMessage>;

        beforeEach(() => {
            result = translationService.getTranslationOfMessages(historyData, userInfoList);
        });

        it('should return translation', () => {
            expect(result).toEqual(historyData);
        });

        it('should translate users', () => {
            expect(result[0].user).toEqual(userInfoList[0].name);
            expect(result[1].user).toEqual(userInfoList[1].name);
        });

        it('should translate time', () => {
            expect(result[0].ts).toEqual('Fri Mar 09 2018 21:43:56 GMT+0100 (CET)');
            expect(result[1].ts).toEqual('Thu Mar 08 2018 08:17:42 GMT+0100 (CET)');
        });

        it('should translate user ids in message text', () => {
            expect(result[0].text).toEqual(':star: @some_name3 @some_name2 (za svatou trp\u011blivost p\u0159i vysv\u011btlov\u00e1n\u00ed)');
            expect(result[1].text).toEqual(':star:@some_name4 za pomoc s vylep\u0161en\u00edm sql dotazu');
        });
    });

    function initData() {
        historyData = [
            {
                type: 'message',
                user: 'U450YKWTD',
                text: ':star: <@U0UQPUZ36> <@U21B4LZ4H> (za svatou trp\u011blivost p\u0159i vysv\u011btlov\u00e1n\u00ed)',
                ts: '1520628236.000067'
            },
            {
                type: 'message',
                user: 'U21B4LZ4H',
                text: ':star:<@U12TWA0RG> za pomoc s vylep\u0161en\u00edm sql dotazu',
                ts: '1520493462.000095'
            }
        ];

        userInfoList = [
            {
                id: 'U450YKWTD',
                name: 'some_name1',
                real_name: 'some_real_name1',
                team_id: 'some_team1'
            },
            {
                id: 'U21B4LZ4H',
                name: 'some_name2',
                real_name: 'some_real_name2',
                team_id: 'some_team2'
            },
            {
                id: 'U0UQPUZ36',
                name: 'some_name3',
                real_name: 'some_real_name3',
                team_id: 'some_team3'
            },
            {
                id: 'U12TWA0RG',
                name: 'some_name4',
                real_name: 'some_real_name4',
                team_id: 'some_team4'
            }
        ];
    }
});
