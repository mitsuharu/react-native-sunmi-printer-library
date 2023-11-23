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
          promise.resolve("connect() is failed.")
        }
      }
      val result = InnerPrinterManager.getInstance().bindService(getReactApplicationContext(), callback)
      if (result == false){
        promise.reject("connect() is failed.")
      }
    } catch (e: Exception) {
      promise.reject("connect() is failed. " + e.message)
    }
  }

  @ReactMethod
  fun disconnect(promise: Promise) {
    try {
      val callback: InnerPrinterCallback = object : InnerPrinterCallback() {
        override fun onConnected(service: SunmiPrinterService) {
          promise.resolve("disconnect() is failed.")
        }
        override fun onDisconnected() {
          printerService = null
          promise.resolve(true)
        }
      }
      val result = InnerPrinterManager.getInstance().unBindService(getReactApplicationContext(), callback)
      if (result == false){
        promise.reject("disconnect() is failed.")
      }
    } catch (e: Exception) {
      promise.reject("disconnect() is failed. " + e.message)
    }
  }


  @ReactMethod
  fun printerInit(promise: Promise) {
    if (printerService == null){
      promise.reject("printerService is not connected.")
    }
    try {

      val callback: InnerResultCallback = object : InnerResultCallback() {
        override fun onRunResult(isSuccess: Boolean) {
          promise.resolve(isSuccess)
        }
        override fun onRaiseException(code: Int, msg: String) {
          promise.reject(msg)
        }
      }
      printerService?.printerInit(null)
       promise.resolve(true)
    } catch (e: Exception) {
      Log.i(TAG, "ERROR: " + e.message)
      promise.reject(e.message)
    }
  }

  companion object {
    const val NAME = "SunmiPrinterLibrary"
  }
}
