import { buildInsectImageKey } from '../storage';

describe('buildInsectImageKey', () => {
  test('should use first letter of insect name when it is alphabetic', () => {
    const key = buildInsectImageKey('Butterfly', '123-456');
    expect(key).toBe('insect_image/b/123-456.jpg');
  });

  test('should use lowercase first letter of insect name', () => {
    const key = buildInsectImageKey('Ant', '123-456');
    expect(key).toBe('insect_image/a/123-456.jpg');
  });

  test('should use underscore when first character is not alphabetic', () => {
    const key = buildInsectImageKey('カブトムシ', '123-456');
    expect(key).toBe('insect_image/_/123-456.jpg');
  });

  test('should use underscore when first character is a number', () => {
    const key = buildInsectImageKey('10-spotted ladybug', '123-456');
    expect(key).toBe('insect_image/_/123-456.jpg');
  });

  test('should use underscore when insect name is empty', () => {
    const key = buildInsectImageKey('', '123-456');
    expect(key).toBe('insect_image/_/123-456.jpg');
  });

  test('should handle special characters correctly', () => {
    const key = buildInsectImageKey('!Special Bug', '123-456');
    expect(key).toBe('insect_image/_/123-456.jpg');
  });
});