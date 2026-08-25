import { ProfileUser } from "./userProfileTypes";

export interface UpdateProfileData {
    name: string;
    userName: string;
    userId: string;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  user: ProfileUser;
}