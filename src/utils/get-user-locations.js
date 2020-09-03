export const geoLocationErrorEnum = {
  browserSupportError: {
    message: "المتصفح لا يدعم خاصية تحديد الموقع",
  },
  permissionDenied: {
    message: "رفض المستخدم صلاحية استخدام تحديد الموقع",
  },
  POSITION_UNAVAILABLE: {
    message: "الموقع غير متاح",
  },
  unKnown: {
    message: "حدث خطأ ما",
  },
}

export async function getMyLocation() {
  return new Promise((resolve, reject) => {
    if (!window.navigator.geolocation) {
      reject(geoLocationErrorEnum.browserSupportError.message)
    }
    window.navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      geolocationErr => {
        if (geolocationErr.PERMISSION_DENIED) {
          reject(geoLocationErrorEnum.permissionDenied.message)
          return
        }
        if (geolocationErr.POSITION_UNAVAILABLE) {
          reject(geoLocationErrorEnum.POSITION_UNAVAILABLE.message)
          return
        }
        reject(geoLocationErrorEnum.unKnown.message)
      },
      {
        enableHighAccuracy: true,
      }
    )
  })
}
