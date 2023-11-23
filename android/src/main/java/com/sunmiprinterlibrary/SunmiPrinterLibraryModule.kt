package com.sunmiprinterlibrary

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.sunmi.peripheral.printer.InnerPrinterCallback
import com.sunmi.peripheral.printer.InnerPrinterManager
import com.sunmi.peripheral.printer.InnerResultCallback
import com.sunmi.peripheral.printer.SunmiPrinterService

class SunmiPrinterLibraryModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val TAG = "SunmiPrinterLibraryModule"
  private var printerService: SunmiPrinterService? = null

  init {
    try {
      val callback: InnerPrinterCallback = object : InnerPrinterCallback() {
        override fun onConnected(service: SunmiPrinterService) {
          printerService = service
        }
        override fun onDisconnected() {
          // 当服务异常断开后，会回调此⽅法，建议在此做重连策略
        }
      }
      InnerPrinterManager.getInstance().bindService(reactContext, callback)
    } catch (e: Exception) {
      Log.i(TAG, "ERROR: " + e.message)
    }
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  override fun printerInit(promise: Promise) {
    if (printerService == null){
      promise.reject("printerService do not connect.")
    }
    try {
      printerService?.printerInit(null)
      promise.resolve()
    } catch (e: Exception) {
      Log.i(TAG, "ERROR: " + e.message)
      promise.reject(e.message)
    }
  }

  companion object {
    const val NAME = "SunmiPrinterLibrary"
  }
}
