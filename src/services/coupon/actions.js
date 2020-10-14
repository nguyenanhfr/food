import { APPLY_COUPON } from "./actionTypes";
import { APPLY_COUPON_URL } from "../../configs";
import Axios from "axios";

export const applyCoupon = (coupon, restaurant_id, subtotal) => (dispatch) => {
	Axios.post(APPLY_COUPON_URL, {
		coupon: coupon,
		restaurant_id: restaurant_id,
		subtotal: subtotal,
	})
		.then((response) => {
			const coupon = response.data;
			return dispatch({ type: APPLY_COUPON, payload: coupon });
		})
		.catch(function(error) {
			console.log(error);
		});
};

export const removeCoupon = () => (dispatch) => {
	const coupon = { hideMessage: true };
	return dispatch({ type: APPLY_COUPON, payload: coupon });
};

export const couponApplied = (coupon, percentage_discount) => (dispatch) => {
	coupon.appliedAmount = percentage_discount;
	return dispatch({ type: APPLY_COUPON, payload: coupon });
};
