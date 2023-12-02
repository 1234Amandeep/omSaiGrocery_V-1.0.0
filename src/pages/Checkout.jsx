import { useSelector } from "react-redux";
import { selectUser } from "../features/authentication/userSlice";
import { selectAddress } from "../features/authentication/addressSlice";
import { selectOrder } from "../features/purchaseOrder/orderSlice";
import Thankyou from "../components/Thankyou";
import Loader from "../components/Loader";
import { selectCart } from "../features/purchaseOrder/cartSlice";
import { selectProducts } from "../features/products/productsSlice";

// TODO: when payment gateway is working for this app their is no need for a checkout page.
export default function Checkout() {
  const { user } = useSelector(selectUser);
  const { address } = useSelector(selectAddress);
  const { cart } = useSelector(selectCart);
  const { products } = useSelector(selectProducts);

  const deliveryCharges = 5;
  let bill = 0;
  let totalBill;

  const calTotalBill = () => {
    cart.forEach((item) => {
      const [singleProduct] = products.filter(
        (product) => product.id == item.product.id
      );
      let price = singleProduct.data.discountedPrice;
      bill = bill + price * item.quantity;
    });
    return bill;
  };

  if (!address || !user || !cart || products.length == 0) {
    return <Loader />;
  } else {
    totalBill = calTotalBill();
  }
  const numItems = cart.length;
  // const numItems = 1;

  return (
    <>
      <section className="container-fluid checkout-outer-container">
        <div className="container-lg checkout-inner-container">
          <p className="fs-4 fw-semibold text-center checkout-title mt-5 text-decoration-underline">
            Checkout
          </p>
          <div className="checkout-main-container pt-3 ps-5 pe-5 pb-3 border d-flex justify-content-around mt-4  shadow p-3 mb-5 bg-body rounded">
            <div className="del-address-head fw-bolder">Delivery address :</div>
            <div className="del-address-content d-flex flex-column">
              <span className="user-name font-monospace">
                {user.contact.displayName}{" "}
              </span>
              <div className="user-address">
                <div className="house-address">
                  <small className="block">{address.Block}, </small>{" "}
                  <small className="flat-no">{address.flatNo}</small>
                </div>
                <div className="society-address">
                  <small className="society">SCC SAPPHIRE</small>
                </div>
                <div className="locality-address">
                  <small className="locality">Raj Nagar Extension</small>
                </div>
                <div className="ciy-address">
                  <small className="city">GHAZIABAD ,</small>
                  <small className="state">UTTAR PRADESH </small>
                  <small className="pincode">201017</small>
                </div>
              </div>
            </div>
          </div>
          <div className=" order-summary-main-container pt-4 ps-5 pe-5 pb-4 border    mt-4  shadow p-3 mb-5 bg-body rounded d-flex flex-column">
            <p className="fs-4 fw-semibold text-center">Order summary</p>
            <small className="lh-sm  mt-2 fw-light order-summary-guidlines">
              Choose a payment method to continue checking out. You will still
              have a chance to review and edit your order before it is final.
            </small>
            <hr
              style={{
                backgroundColor: "hsl(0, 0%, 80%)",
                marginBottom: "15px",
                marginTop: "20px",
              }}
            />
            <div className="order-summary-container">
              <span className="fs-6 fw-bolder order-summary-head">
                <u>Order Details :</u>
              </span>
              <div className="mt-4 order-summary-detailed">
                <table className="table table-borderless order-summary-table">
                  <tbody>
                    <tr>
                      <td>Items:</td>
                      <td className="table-rows-price">{numItems}</td>
                    </tr>
                    <tr>
                      <td>Delivery:</td>
                      <td className="table-rows-price">
                        &#8377;{deliveryCharges}.00
                      </td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td className="table-rows-price">
                        &#8377;{totalBill}
                        .00
                      </td>
                    </tr>
                  </tbody>
                </table>
                <hr
                  style={{
                    backgroundColor: "hsl(0, 0%, 80%)",
                    marginBottom: "20px",
                    marginTop: "10px",
                  }}
                />
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td
                        className="fs-6 fw-bolder "
                        style={{ color: "hsl(0, 100%, 50%)" }}
                      >
                        Order Total:
                      </td>
                      <td className="table-rows-price">
                        &#8377;{totalBill + deliveryCharges}
                        .00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Thankyou />
        </div>
      </section>
    </>
  );
}
