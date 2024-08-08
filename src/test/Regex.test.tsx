import { REGEX } from '../utils/constants'; 

describe('REGEX Tests', () => {
    test('EMAIL regex', () => {
        expect(REGEX.EMAIL.test('test@example.com')).toBe(true);
        expect(REGEX.EMAIL.test('user.name+tag+sorting@example.com')).toBe(true);
        expect(REGEX.EMAIL.test('user.name@sub.example.com')).toBe(true);
        expect(REGEX.EMAIL.test('user@example')).toBe(false);
        expect(REGEX.EMAIL.test('user@.com')).toBe(false);
    });

    test('PHONE regex', () => {
        expect(REGEX.PHONE.test('+123456789')).toBe(true);
        expect(REGEX.PHONE.test('1234567890')).toBe(true);
        expect(REGEX.PHONE.test('+123456789012345')).toBe(true);
        expect(REGEX.PHONE.test('+1234567890123456')).toBe(false);
        expect(REGEX.PHONE.test('123-456-7890')).toBe(false);
    });

    test('ONLYNUMBERS regex', () => {
        expect(REGEX.ONLYNUMBERS.test('12345')).toBe(true);
        expect(REGEX.ONLYNUMBERS.test('123a45')).toBe(false);
        expect(REGEX.ONLYNUMBERS.test('')).toBe(true);
    });

    test('LATITUDE regex', () => {
        expect(REGEX.LATITUDE.test('90')).toBe(true);
        expect(REGEX.LATITUDE.test('-90')).toBe(true);
        expect(REGEX.LATITUDE.test('45.123456')).toBe(true);
        expect(REGEX.LATITUDE.test('90.123456')).toBe(false);
        expect(REGEX.LATITUDE.test('91')).toBe(false);
    });

    test('LONGITUDE regex', () => {
        expect(REGEX.LONGITUDE.test('180')).toBe(true);
        expect(REGEX.LONGITUDE.test('-180')).toBe(true);
        expect(REGEX.LONGITUDE.test('123.123456')).toBe(true);
        expect(REGEX.LONGITUDE.test('180.123456')).toBe(false);
        expect(REGEX.LONGITUDE.test('181')).toBe(false);
    });

    test('NUMBERS_DOTS_COMMAS regex', () => {
        expect(REGEX.NUMBERS_DOTS_COMMAS.test('123')).toBe(true);
        expect(REGEX.NUMBERS_DOTS_COMMAS.test('123,456')).toBe(true);
        expect(REGEX.NUMBERS_DOTS_COMMAS.test('123.456')).toBe(false);
        expect(REGEX.NUMBERS_DOTS_COMMAS.test('123,456,789')).toBe(false);
    });

    test('CURRENCY regex', () => {
        expect(REGEX.CURRENCY.test('$')).toBe(true);
        expect(REGEX.CURRENCY.test('€')).toBe(true);
        expect(REGEX.CURRENCY.test('£')).toBe(true);
        expect(REGEX.CURRENCY.test('¥')).toBe(true);
        expect(REGEX.CURRENCY.test('USD')).toBe(false);
        expect(REGEX.CURRENCY.test('$100')).toBe(false);
    });

    test('URL regex', () => {
        expect(REGEX.URL.test('http://example.com')).toBe(true);
        expect(REGEX.URL.test('https://example.com')).toBe(true);
        expect(REGEX.URL.test('https://example.com/path')).toBe(true);
        expect(REGEX.URL.test('http://example')).toBe(false);
        expect(REGEX.URL.test('example.com')).toBe(false);
    });
});
