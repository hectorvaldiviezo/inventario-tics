"use client"

import { useEffect, useState } from "react"

type MobileOS = "android" | "ios" | "other"

export function useMobileOS() {
  const [os, setOS] = useState<MobileOS>("other")

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

    if (/android/i.test(userAgent)) {
      setOS("android")
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setOS("ios")
    } else {
      setOS("other")
    }
  }, [])

  return os
}
