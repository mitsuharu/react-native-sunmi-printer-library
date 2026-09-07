package com.sunmiprinterlibrary

internal fun calculateScaledBitmapHeight(
  targetWidth: Int,
  sourceWidth: Int,
  sourceHeight: Int,
): Int = (targetWidth.toLong() * sourceHeight / sourceWidth).toInt()
