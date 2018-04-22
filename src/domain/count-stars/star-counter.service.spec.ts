import {Senders, SendersResult, StarCounterService} from './star-counter.service';
import {SlackChannelHistoryMessage} from '../read-slack/slack.service';

describe(StarCounterService.name, () => {
    let data: Array<SlackChannelHistoryMessage>;

    beforeEach(() => {
        initData();
    });

    describe('countSenders', () => {
        let result: SendersResult;
        let starCounterService: StarCounterService;

        beforeEach(() => {
            starCounterService = new StarCounterService();
            result = starCounterService.countSenders(data);
        });

        it('should count total count of stars', () => {
            expect(result.totalCountOfSentStars).toEqual(10);
        });

        it(' should create proper list of senders', () => {
            expect(result.listOfSenders).toEqual({
                id0001: [
                    {
                        recipientId: 'id0099',
                        numberOfStars: 1
                    }
                ],
                id0050: [
                    {
                        recipientId: 'id0015',
                        numberOfStars: 1
                    },
                    {
                        recipientId: 'id0016',
                        numberOfStars: 1
                    }
                ],
                id0012: [
                    {
                        recipientId: 'id0002',
                        numberOfStars: 1
                    }
                ],
                id0009: [
                    {
                        recipientId: 'id0008',
                        numberOfStars: 2
                    },
                    {
                        recipientId: 'id0007',
                        numberOfStars: 1
                    }
                ],
                id0004: [
                    {
                        recipientId: 'id0005',
                        numberOfStars: 2
                    },
                    {
                        recipientId: 'id0006',
                        numberOfStars: 1
                    }
                ]
            } as Senders);
        });
    });

    function initData(): void {
        data = [
            {
                'type': 'message',
                'user': 'id0001',
                'text': '<@id0099> :star: za velmi trefne odpovedi i otazky pri vysvetlovani kanbanu. Jsi Kanban talent! :slightly_smiling_face:',
                'ts': '1518179413.000414'
            },
            {
                'type': 'message',
                'user': 'id0050',
                'text': '<@id0015> :star: for the help with unit tests on ADM UI\n<@id0016> :star: pom\u00e1h\u00e1 mi, ' +
                'vysv\u011btluje mi, kritizuje :slightly_smiling_face:',
                'ts': '1518165687.000193'
            },
            {
                'type': 'message',
                'user': 'id0002',
                'text': 'dondi sem za nama :slightly_smiling_face:',
                'ts': '1518081777.000264',
            },
            {
                'type': 'message',
                'user': 'id0012',
                'text': '<@id0002> :star: za vervu, s jakou se vrhl do gemba kaizen, i kdy\u017e to znamen\u00e1, \u017ee u\u017e se ' +
                'nem\u016f\u017ee t\u011b\u0161it z m\u00e9 p\u0159\u00edtomnosti v jedn\u00e9 kancel\u00e1\u0159i :stuck_out_tongue:',
                'ts': '1518081717.000550'
            },
            {
                'type': 'message',
                'user': 'id0009',
                'text': '<@id0008> :star: :star: (Zdendo, d\u00edky za dlouhodobou nezjistnou starost o brnenskou kancelar a nasazovani ' +
                'vlastniho zdravi ve prospech firmy.)\n<@id0007> :star: (M\u00ed\u0161o, d\u00edky za spoustu mal\u00fdch pomoc\u00ed a ' +
                'pravidelnou d\u00e1vku ovoce a zeleniny, navzdory zru\u0161en\u00ed kosiku.cz.)',
                'ts': '1517923241.000493'
            },
            {
                'type': 'message',
                'user': 'id0004',
                'text': '<@id0005> :star  jsem retard a neumim napsat hvezdicku',
                'ts': '1517906500.000000',
            },
            {
                'type': 'message',
                'user': 'id0004',
                'text': '<@id0005> <@id0006> jsem retard a neumim napsat podekovani s hvezdickou',
                'ts': '1517906500.000000',
            }
        ];
    }
});
