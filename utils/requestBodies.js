export class master_data {
  patch_goal_category_payload(createdDate, lastModifiedDate, id = 0, isActive = true, goalType = 0, sequence = 0,
    lumpsumAmount = 0, targetAmount = 0, sipAmount = 0, tenureInMonth = 0, isDefault = true, obj_additionalProp1 = {}) {
    let request_payload = {
      "id": id,
      "isActive": isActive,
      "createdDate": `${createdDate}`,
      "lastModifiedDate": `${lastModifiedDate}`,
      "goalType": goalType,
      "sequence": sequence,
      "lumpsumAmount": lumpsumAmount,
      "targetAmount": targetAmount,
      "sipAmount": sipAmount,
      "tenureInMonth": tenureInMonth,
      "icon": "string",
      "isDefault": isDefault,
      "category": "string",
      "additionalProp1": obj_additionalProp1
    }
    return JSON.stringify(request_payload);
  }
  get_riskProfile_count_payload(where) {
    let request_payload = {
      "where": where
    }
    return JSON.stringify(request_payload);
  }
}

export class user_management {
  post_device_payload(isActive, uniqueId, deviceType, deviceName, osName, versionName, versionCode, osSDKVersion) {
    let request_payload = {
      "isActive": isActive,
      "uniqueId": uniqueId,
      "deviceType": deviceType,
      "deviceName": deviceName,
      "osName": osName,
      "versionName": versionName,
      "versionCode": versionCode,
      "osSDKVersion": osSDKVersion
    }
    return JSON.stringify(request_payload);
  }

  post_save_PreLoginData_payload(deviceId, uniqueId, userData) {
    let request_payload = {
      "deviceId": deviceId,
      "uniqueId": uniqueId,
      "userData": userData
    }
    return JSON.stringify(request_payload);
  }

  get_fetch_PreLoginUsers_payload(deviceId, uniqueId, limit, offset) {
    let request_payload = {
      "deviceId": deviceId,
      "uniqueId": uniqueId,
      "limit": limit,
      "offset": offset
    }
    return JSON.stringify(request_payload);
  }

  post_appUser_generateOTP_payload(contactNumber, countryCode) {
    let request_payload = {
      "contactNumber": contactNumber,
      "countryCode": countryCode
    }
    return JSON.stringify(request_payload);
  }

  post_appUser_verifyOTP_payload(contactNumber, countryCode, deviceUniqueId, otp) {
    let request_payload = {
      "contactNumber": contactNumber,
      "countryCode": countryCode,
      "deviceUniqueId": deviceUniqueId,
      "otp": otp
    }
    return JSON.stringify(request_payload);
  }

  post_appUser_setupMpin_payload(mpin) {
    let request_payload = {
      "mpin": mpin
    }
    return JSON.stringify(request_payload);
  }

  post_appUser_loginWithMpin(deviceUniqueId, mpin) {
    let request_payload = {
      "deviceUniqueId": deviceUniqueId,
      "mpin": mpin
    }
    return JSON.stringify(request_payload);
  }


}