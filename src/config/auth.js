import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const uploadAvatarToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );
  formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error?.message || "Cloudinary upload failed");

    return data.url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return "";
  }
};

export const signupUser = async (values, avatar) => {
  // Upload avatar if exists
  const avatarUrl = avatar.file
    ? await uploadAvatarToCloudinary(avatar.file)
    : "";

  // Create Firebase user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    values.email,
    values.password
  );

  const userId = userCredential.user.uid;

  // Prepare user data
  const userData = {
    id: userId,
    username: values.username,
    email: values.email,
    avatar: avatarUrl,
    blocked: [],
  };

  // Save user and chat info in Firestore
  await setDoc(doc(db, "users", userId), userData);
  await setDoc(doc(db, "userChats", userId), { chats: [] });

  return userId;
};

export const loginUser = async (values) => {
  return await signInWithEmailAndPassword(auth, values.email, values.password);
};
