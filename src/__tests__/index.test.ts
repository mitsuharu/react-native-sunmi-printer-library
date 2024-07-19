import { NativeModules } from 'react-native';
import { prepare, printText } from '../index';

/*
 * [wantfix] It requires better test code. 
 * It also recommends print test to use actual device.
 */

// ネイティブモジュールのモックを作成
jest.mock('react-native', () => ({
  NativeModules: {
    SunmiPrinterLibrary: {
      connect: jest.fn().mockResolvedValue(true),
      disconnect: jest.fn().mockResolvedValue(true),
      printerInit: jest.fn().mockResolvedValue(true),
      setDefaultFontSize: jest.fn().mockResolvedValue(true),
      setFontSize: jest.fn().mockResolvedValue(true),
      printText: jest.fn().mockResolvedValue(true),
    },
    SunmiScannerLibrary: {
      scan: jest.fn().mockResolvedValue('scanned_data'),
    },
  },
  Platform: {
    select: jest.fn((obj) => obj.android),
  },
}));

describe('SunmiPrinterLibrary', () => {
  it('プリンターを準備できること', async () => {
    const result = await prepare();
    expect(result).toBe(true);
  });

  it('テキストを印刷できること', async () => {
    const text = 'こんにちは、プリンター！';
    await printText(text);
    expect(NativeModules.SunmiPrinterLibrary.printText).toHaveBeenCalledWith(text);
  });

  // 他の機能に対するテストも追加
});
