package com.sunmiprinterlibrary

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

/**
 * @see
 * https://developer.sunmi.com/docs/en-US/xeghjk491/ciceghjk502
 */
class SunmiScannerLibraryModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val context = getReactApplicationContext()
  private val REQUEST_CODE = 5839
  private val onScanSuccess = "onScanSuccess"
  private val onScanFailed = "onScanFailed"
  private var mPromise: Promise? = null

  private val activityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
      try{
        if (requestCode == REQUEST_CODE && data != null) {
          val bundle: Bundle? = data.getExtras()
          val result = bundle?.getSerializable("data") as ArrayList<HashMap<String, String>>
          val it = result.iterator()
          while (it.hasNext()) {
            val hashMap = it.next();
            sendEventSuccess(hashMap["VALUE"].toString())
          }
        }else{
          sendEventFailed("scan() is failed.")
        }
      } catch (e: Exception) {
        sendEventFailed("scan() is failed. " + e.message)
      }
    }
  }

  init {
    context.addActivityEventListener(activityEventListener);
  }

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "SunmiScannerLibrary"
  }

  @ReactMethod
  fun scan(promise: Promise) {
    val activity: Activity? = getCurrentActivity()
    if (activity == null) {
      sendEventFailed("scan is failed. There is not an activity.")
      return
    }
    try {
      mPromise = promise
      val intent = Intent("com.sunmi.scan")
      intent.setPackage("com.sunmi.sunmiqrcodescanner")
      intent.putExtra("PLAY_SOUND", true)
      activity.startActivityForResult(intent, REQUEST_CODE)
    } catch (e: Exception) {
      sendEventFailed("scan is failed. " + e.message)
    }
  }

  private fun sendEventSuccess(message: String) {
    val emitter = context.getJSModule(RCTDeviceEventEmitter::class.java)
    emitter.emit(onScanSuccess, message)
    mPromise?.resolve(message)
    mPromise = null
  }

  private fun sendEventFailed(message: String) {
    val emitter = context.getJSModule(RCTDeviceEventEmitter::class.java)
    emitter.emit(onScanFailed, message)
    mPromise?.reject("0", "scan is failed. " + message)
    mPromise = null
  }

}
