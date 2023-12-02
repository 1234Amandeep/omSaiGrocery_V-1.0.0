import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { removeUser } from "../features/authentication/userSlice";

export function useLogout() {
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      console.log("User Signed Out...");
    } catch (error) {
      console.log(error.message);
    }
  };
  return { logOut };
}
