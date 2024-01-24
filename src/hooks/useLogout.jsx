import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/authentication/userSlice";
import { selectCart, setCart } from "../features/purchaseOrder/cartSlice";
import { selectCartId, setCartId } from "../features/purchaseOrder/cartIdSlice";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);
  const { cartId } = useSelector(selectCartId);
  const navigate = useNavigate();
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
