package com.sunmiprinterlibrary

import org.junit.Assert.assertEquals
import org.junit.Test

class BitmapDimensionsTest {
  @Test
  fun `calculates a non-zero height when source is wider than target`() {
    assertEquals(256, calculateScaledBitmapHeight(384, 1080, 720))
  }

  @Test
  fun `preserves the aspect ratio when enlarging an image`() {
    assertEquals(300, calculateScaledBitmapHeight(576, 384, 200))
  }

  @Test
  fun `uses long arithmetic before multiplication`() {
    assertEquals(4_000_000, calculateScaledBitmapHeight(2, 1, 2_000_000))
  }
}
