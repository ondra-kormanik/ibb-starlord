import {trimEnd, trimStart} from 'lodash';

export class TextAnalyzer {
    public static findIdsInText(text: string): Array<string> {
        const reg = /<@\w*>/gi;
        const result = text.match(reg);
        if (result && result.length) {
            return result.map((id) => trimEnd(trimStart(id, '<@'), '>'));
        } else {
            return [];
        }
    }

    public static countStarsInText(text: string): number {
        const reg = /:star/gi;
        const result = text.match(reg);
        if (result && result.length) {
            return result.length;
        } else {
            return 0;
        }
    }

    public static splitTextIntoLines(text: string): Array<string> {
        return text.split(/\r?\n/);
    }
}
