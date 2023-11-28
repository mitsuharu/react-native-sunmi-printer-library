package com.sunmiprinterlibrary

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.sunmi.peripheral.printer.InnerPrinterCallback
import com.sunmi.peripheral.printer.InnerPrinterManager
import com.sunmi.peripheral.printer.InnerResultCallback
import com.sunmi.peripheral.printer.SunmiPrinterService

class SunmiPrinterLibraryModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var printerService: SunmiPrinterService? = null

  private enum class ReturnType {
    String,
    Boolean,
    Print,
  }

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
  private fun makeInnerResultCallback(promise: Promise, returnType: ReturnType = ReturnType.Boolean): InnerResultCallback {
    val callback: InnerResultCallback = object : InnerResultCallback() {
      override fun onRunResult(isSuccess: Boolean) {
        if (returnType == ReturnType.Boolean){
          promise.resolve(isSuccess)
        }
      }
      override fun onReturnString(result: String) {
        if (returnType == ReturnType.String){
          promise.resolve(result)
        }
      }
      override fun onRaiseException(code: Int, msg: String) {
        promise.reject(code.toString(), msg)
      }
      override fun onPrintResult(code: Int, msg: String) {
        if (returnType == ReturnType.Print){
          promise.resolve(code.toString() + " " + msg)
        }
      }
    }
    return callback
  }

}
