package com.sunmiprinterlibrary

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.os.RemoteException
import android.util.Base64
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.sunmi.peripheral.printer.InnerPrinterCallback
import com.sunmi.peripheral.printer.InnerPrinterManager
import com.sunmi.peripheral.printer.InnerResultCallback
import com.sunmi.peripheral.printer.SunmiPrinterService
import com.sunmi.peripheral.printer.WoyouConsts


class SunmiPrinterLibraryModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var printerService: SunmiPrinterService? = null
 
  init {}

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "SunmiPrinterLibrary"
  }

  @ReactMethod
  fun connect(promise: Promise) {
    try {
      val callback: InnerPrinterCallback = object : InnerPrinterCallback() {
        override fun onConnected(service: SunmiPrinterService) {
          printerService = service
          promise.resolve(true)
        }
        override fun onDisconnected() {
          printerService = null
          promise.reject("0", "native#connect() is failed.")
        }
      }
      val result = InnerPrinterManager.getInstance().bindService(getReactApplicationContext(), callback)
      if (!result){
        promise.reject("0", "native#connect() is failed.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#connect() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun disconnect(promise: Promise) {
    try {
      val callback: InnerPrinterCallback = object : InnerPrinterCallback() {
        override fun onConnected(service: SunmiPrinterService) {
          promise.reject("0", "native#disconnect() is failed.")
        }
        override fun onDisconnected() {
          printerService = null
          promise.resolve(true)
        }
      }
      InnerPrinterManager.getInstance().unBindService(getReactApplicationContext(), callback)
    } catch (e: Exception) {
      promise.reject("0", "native#disconnect() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printerInit(promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.printerInit(callback)
    } catch (e: Exception) {
      promise.reject("0", "native#printerInit() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printerSelfChecking(promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.printerSelfChecking(callback)
    } catch (e: Exception) {
      promise.reject("0", "native#printSelfChecking() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getPrinterInfo(promise: Promise) {
    validatePrinterService(promise)
    try {
      val serialNumber = printerService?.getPrinterSerialNo()
      val printerVersion = printerService?.getPrinterVersion()
      val serviceVersion = printerService?.getServiceVersion()
      val printerModal = printerService?.getPrinterModal()
      val paperWidth = if (printerService?.getPrinterPaper() == 1) "58mm" else "80mm"

      val map: WritableMap = Arguments.createMap()
      map.putString("serialNumber", serialNumber)
      map.putString("printerVersion", printerVersion)
      map.putString("serviceVersion", serviceVersion)
      map.putString("printerModal", printerModal)
      map.putString("paperWidth", paperWidth)

      promise.resolve(map)
    } catch (e: Exception) {
      promise.reject("0", "native#getPrinterInfo() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getPrinterSerialNo(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getPrinterSerialNo()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", "native#getPrinterSerialNo() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getPrinterVersion(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getPrinterVersion()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", "native#getPrinterVersion() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getServiceVersion(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getServiceVersion()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", "native#getServiceVersion() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getPrinterModal(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getPrinterModal()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", "native#getPrinterModal() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getPrinterPaper(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result0 = printerService?.getPrinterPaper()
      val result1 = if (result0 == 1) "58mm" else "80mm"
      promise.resolve(result1)
    } catch (e: Exception) {
      promise.reject("0", "native#getPrinterPaper() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getPrintedLength(promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.getPrintedLength(callback)
    } catch (e: Exception) {
      promise.reject("0", "native#getPrintedLength() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun updatePrinterState(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.updatePrinterState()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", "native#updatePrinterState() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun sendRAWData(base64: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      val date = Base64.decode(base64, Base64.DEFAULT);
      printerService?.sendRAWData(date, callback);
    } catch (e: Exception) {
      promise.reject("0", "native#sendRAWData() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun setPrinterStyleBoolean(key: String, value: Boolean, promise: Promise) {
    validatePrinterService(promise)
    try {
      val _key = when (key) {
        "doubleWidth" -> WoyouConsts.ENABLE_DOUBLE_WIDTH
        "doubleHeight" -> WoyouConsts.ENABLE_DOUBLE_HEIGHT
        "bold" -> WoyouConsts.ENABLE_BOLD
        "underline"  -> WoyouConsts.ENABLE_UNDERLINE
        "antiWhite"  -> WoyouConsts.ENABLE_ANTI_WHITE
        "strikethrough"  -> WoyouConsts.ENABLE_STRIKETHROUGH
        "italic"  -> WoyouConsts.ENABLE_ILALIC
        "invert" -> WoyouConsts.ENABLE_INVERT
        else -> null
      }
      val _value = if (value) {
        WoyouConsts.ENABLE
      } else {
        WoyouConsts.DISABLE
      }
      if (_key != null){
        printerService?.setPrinterStyle(_key, _value)
        promise.resolve(true)
      }else{
        promise.reject("0", "native#setPrinterStyleBoolean() is failed. key or value is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#setPrinterStyleBoolean() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun setPrinterStyleNumber(key: String, value: Int, promise: Promise) {
    validatePrinterService(promise)
    try {
      val _key = when (key) {
        "textRightSpacing" -> WoyouConsts.SET_TEXT_RIGHT_SPACING
        "relativePosition" -> WoyouConsts.SET_RELATIVE_POSITION
        "absolutePosition" -> WoyouConsts.SET_ABSOLUATE_POSITION
        "lineSpacing"  -> WoyouConsts.SET_LINE_SPACING
        "leftSpacing"  -> WoyouConsts.SET_LEFT_SPACING
        "strikethroughStyle"  -> WoyouConsts.SET_STRIKETHROUGH_STYLE
        else -> null
      }
      if (_key != null){
        printerService?.setPrinterStyle(_key, value)
        promise.resolve(true)
      } else {
        promise.reject("0", "native#setPrinterStyleNumber is failed. key is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#setPrinterStyleNumber is failed. " + e.message)
    }
  }

  @ReactMethod
  fun setAlignment(key: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val _key = alignmentToInt(key)
      if (_key != null){
        val callback = makeInnerResultCallback(promise)
        printerService?.setAlignment(_key, callback)
      } else {
        promise.reject("0", "native#setAlignment is failed. key is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#setAlignment is failed. " + e.message)
    }
  }

  @ReactMethod
  fun setFontName(fontName: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val _fontName = when (fontName) {
        "chineseMonospaced" -> "gh"
        else -> null
      }
      if (_fontName != null){
        val callback = makeInnerResultCallback(promise)
        printerService?.setFontName(_fontName, callback)
      } else {
        promise.reject("0", "native#setFontName() is failed because key is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#setFontName() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun setFontSize(fontSize: Float, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.setFontSize(fontSize, callback)
    } catch (e: Exception) {
      promise.reject("0", "native#setFontSize() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun setBold(isBold: Boolean, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      val data = ByteArray(3)
      data[0] = 0x1B
      data[1] = 0x45
      data[2] = if (isBold) { 0x1 } else { 0x0 }
      printerService?.sendRAWData(data, callback);
    } catch (e: Exception) {
      promise.reject("0", "native#setBold() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printText(text: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.printText(text + "\n", callback)
    } catch (e: Exception) {
      promise.reject("0", "native#printText() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printTextWithFont(text: String, typeface: String, fontSize: Float, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      val _typeface = when (typeface) {
        "default" -> ""
        else -> null
      }
      if (_typeface != null){
        printerService?.printTextWithFont(text + "\n", _typeface, fontSize, callback)
      } else {
        promise.reject("0", "native#printTextWithFont is failed because typeface is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#printTextWithFont is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printOriginalText(text: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.printOriginalText(text + "\n", callback)
    } catch (e: Exception) {
      promise.reject("0", "native#printOriginalText is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printColumnsText(texts: ReadableArray, widths: ReadableArray, alignments: ReadableArray, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)

      var _texts = arrayOf<String>()
      for (i in 0..(texts.size()-1)){
        _texts += texts.getString(i)
      }

      var _widths = intArrayOf()
      for (i in 0..(widths.size()-1)){
        _widths += widths.getInt(i)
      }

      var _alignments = intArrayOf()
      for (i in 0..(alignments.size()-1)){
        val temp = alignmentToInt(alignments.getString(i))
        if(temp != null){
          _alignments += temp
        }
      }

      if (_texts.size == _alignments.size && _texts.size == _widths.size) {
         printerService?.printColumnsText(_texts, _widths, _alignments, callback)
       } else {
         promise.reject("0", "native#printColumnsText is failed because alignments is incorrect.")
       }
    } catch (e: Exception) {
      promise.reject("0", "native#printColumnsText is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printColumnsString(texts: ReadableArray, widths: ReadableArray, alignments: ReadableArray, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)

      var _texts = arrayOf<String>()
      for (i in 0..(texts.size()-1)){
        _texts += texts.getString(i)
      }

      var _widths = intArrayOf()
      for (i in 0..(widths.size()-1)){
        _widths += widths.getInt(i)
      }

      var _alignments = intArrayOf()
      for (i in 0..(alignments.size()-1)){
        val temp = alignmentToInt(alignments.getString(i))
        if(temp != null){
          _alignments += temp
        }
      }

      if (_texts.size == _alignments.size && _texts.size == _widths.size) {
         printerService?.printColumnsString(_texts, _widths, _alignments, callback)
       } else {
         promise.reject("0", "native#printColumnsString is failed because alignments is incorrect.")
       }
    } catch (e: Exception) {
      promise.reject("0", "native#printColumnsString is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printBarcode(text: String, symbology: String, height: Int, width: Int, textPosition: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val _symbology = when (symbology) {
        "UPC-A" -> 0
        "UPC-E" -> 1
        "JAN13(EAN13)" -> 2
        "JAN8(EAN8)" -> 3
        "CODE39" -> 4
        "ITF" -> 5
        "CODABAR" -> 6
        "CODE93" -> 7
        "CODE128" -> 8
        else -> null
      }
      val _textPosition = when (textPosition) {
        "none" -> 0
        "textAboveBarcode" -> 1
        "textUnderBarcode" -> 2
        "textAboveAndUnderBarcode" -> 3
        else -> null
      }

      if (_symbology != null && _textPosition != null) {
        val callback = makeInnerResultCallback(promise)
        printerService?.printBarCode(text, _symbology, height, width, _textPosition, callback)
      } else {
        promise.reject("0", "native#printBarCode is failed because alignments is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#printBarCode is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printQRCode(text: String, moduleSize: Int, errorLevel: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val _errorLevel = when (errorLevel) {
        "low" -> 0
        "middle" -> 1
        "quartile" -> 2
        "high" -> 3
        else -> null
      }
      if (_errorLevel != null) {
        val callback = makeInnerResultCallback(promise)
        printerService?.printQRCode(text, moduleSize, _errorLevel, callback)
      } else {
        promise.reject("0", "native#printQRCode is failed because alignments is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", "native#printQRCode is failed. " + e.message)
    }
  }

  @ReactMethod
  fun print2DCode(text: String, symbology: Int, moduleSize: Int, errorLevel: Int, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
        printerService?.print2DCode(text, symbology, moduleSize, errorLevel, callback)
    } catch (e: Exception) {
      promise.reject("0", "native#print2DCode is failed. " + e.message)
    }
  }

  @ReactMethod
  fun lineWrap(count: Int, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.lineWrap(count, callback)
    } catch (e: Exception) {
      promise.reject("0", "native#lineWrap is failed. " + e.message)
    }
  }

  @ReactMethod
  fun cutPaper(promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.cutPaper(callback)
    } catch (e: Exception) {
      promise.reject("0", "native#cutPaper is failed. " + e.message)
    }
  }

  @ReactMethod
  fun getCutPaperTimes(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getCutPaperTimes()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", "native#cutPaper is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printBitmapBase64(base64: String, pixelWidth: Int, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      val pureBase64Encoded = base64.substring(base64.indexOf(",") + 1)
      val decodedBytes = Base64.decode(pureBase64Encoded, Base64.DEFAULT)
      val decodedBitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
      val w = decodedBitmap.width
      val h = decodedBitmap.height
      val image = Bitmap.createScaledBitmap(decodedBitmap, pixelWidth, pixelWidth / w * h, false)
      printerService?.printBitmap(image, callback)
    } catch (e: Exception) {
      promise.reject("0", "native#printBitmapBase64 is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printBitmapBase64Custom(base64: String, pixelWidth: Int, type: Int, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      val pureBase64Encoded = base64.substring(base64.indexOf(",") + 1)
      val decodedBytes = Base64.decode(pureBase64Encoded, Base64.DEFAULT)
      val decodedBitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
      val w = decodedBitmap.width
      val h = decodedBitmap.height
      val image = Bitmap.createScaledBitmap(decodedBitmap, pixelWidth, pixelWidth / w * h, false)
      printerService?.printBitmapCustom(image, type, callback)
    } catch (e: Exception) {
      promise.reject("0", "native#printBitmapBase64Custom is failed. " + e.message)
    }
  }

  /**
   * printerService が有効かどうか調べる
   */
  private fun validatePrinterService(promise: Promise) {
    if (printerService == null){
      promise.reject("0", "PrinterService is disabled because InnerPrinter is not connected.")
    }
  }

  /**
   * 結果用のコールバックを生成する
   */
  private fun makeInnerResultCallback(promise: Promise): InnerResultCallback {
    val callback: InnerResultCallback = object : InnerResultCallback() {
      override fun onRunResult(isSuccess: Boolean) {
        if (isSuccess){
          promise.resolve(isSuccess)
        } else {
          promise.reject("0", "isSuccess is false.")
        }
      }
      override fun onReturnString(result: String) {
        promise.resolve(result)
      }
      override fun onRaiseException(code: Int, msg: String) {
        promise.reject(code.toString(), msg)
      }
      override fun onPrintResult(code: Int, msg: String) {
        promise.resolve(code.toString() + " " + msg)
      }
    }
    return callback
  }

  private fun alignmentToInt(alignment: String): Int? {
    val value = when (alignment) {
      "left" -> 0
      "center" -> 1
      "right" -> 2
      else -> null
    }
    return value
  }

}
