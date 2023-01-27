import Types from '../saga-types';

export const loginUser = payload => ({type: Types.Login_Dispatch, payload});

export const signUpUser = payload => ({type: Types.SignUp_Dispatch, payload});

export const logOutUser = _ => ({type: Types.LogOut_Dispatch});

export const verifyUser = _ => ({type: Types.Verify_Dispatch});
export const getUser = _ => ({type: Types.getUser_Dispatch});

export const updateAuth = payload => ({type: Types.Auth_Update, payload});

export const forgotUser = payload => ({type: Types.Forgot_Dispatch, payload});

export const verifyCode = payload => ({
  type: Types.Verification_Dispatch,
  payload,
});

export const updatePassword = payload => ({
  type: Types.Update_Dispatch,
  payload,
});

export const socialLogin = payload => ({
  type: Types.SocialLogin_Dispatch,
  payload,
});

export const updateProfile = payload => ({
  type: Types.UpdateProfile_Dispatch,
  payload,
});

export const fcmTokenAction = payload => ({
  type: Types.FCMToken_Dispatch,
  payload,
});
