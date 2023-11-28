package com.sunmiprinterlibrary

import android.util.Base64
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.sunmi.peripheral.printer.InnerPrinterCallback
import com.sunmi.peripheral.printer.InnerPrinterManager
import com.sunmi.peripheral.printer.InnerResultCallback
import com.sunmi.peripheral.printer.SunmiPrinterService
import com.sunmi.peripheral.printer.WoyouConsts;

class SunmiPrinterLibraryModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var printerService: SunmiPrinterService? = null

//  var handler: InnerResultCallback = object : InnerResultCallback() {
//    override fun onRunResult(isSuccess: Boolean) {
//      if (isSuccess) {
//        val map: WritableMap = Arguments.createMap()
//        map.putBoolean("success", true)
//        promise.resolve(map)
//      }
//    }

//    override fun onReturnString(result: String) {
//    }

//    override fun onRaiseException(code: Int, msg: String) {
//      promise.reject(code.toString(), msg)
//    }

//    override fun onPrintResult(code: Int, msg: String) {
//    }
//  }

  init {}

  override fun getName(): String {
    return NAME
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
          promise.reject("0", "connect() is failed.")
        }
      }
      val result = InnerPrinterManager.getInstance().bindService(getReactApplicationContext(), callback)
      if (!result){
        promise.reject("0", "connect() is failed.")
      }
    } catch (e: Exception) {
      promise.reject("0", "connect() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun disconnect(promise: Promise) {
    try {
      InnerPrinterManager.getInstance().unBindService(getReactApplicationContext(), null)
      printerService = null
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("0", "disconnect() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun printerInit(promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.printerInit(callback)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun printerSelfChecking(promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.printerSelfChecking(callback)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun getPrinterSerialNo(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getPrinterSerialNo()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun getPrinterVersion(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getPrinterVersion()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun getServiceVersion(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getServiceVersion()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun getPrinterModal(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.getPrinterModal()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", e.message)
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
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun getPrintedLength(promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.getPrintedLength(callback)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun updatePrinterState(promise: Promise) {
    validatePrinterService(promise)
    try {
      val result = printerService?.updatePrinterState()
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("0", e.message)
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
      promise.reject("0", e.message)
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
        promise.reject("0", "key or value is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", e.message)
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
        promise.reject("0", "key is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun setAlignment(key: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val _key = when (key) {
        "left" -> 0
        "center" -> 1
        "right" -> 2
        else -> null
      }
      if (_key != null){
        val callback = makeInnerResultCallback(promise)
        printerService?.setAlignment(_key, callback)
      } else {
        promise.reject("0", "key is incorrect.")
      }
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun printText(text: String, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)

      // なぜか改行コードがないと、印刷が途中で止まる
      // It stops to print text in middle if there is no a new line code. why...
      printerService?.printText(text + "\n", callback)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  @ReactMethod
  fun lineWrap(count: Int, promise: Promise) {
    validatePrinterService(promise)
    try {
      val callback = makeInnerResultCallback(promise)
      printerService?.lineWrap(count, callback)
    } catch (e: Exception) {
      promise.reject("0", e.message)
    }
  }

  companion object {
    const val NAME = "SunmiPrinterLibrary"
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

}
