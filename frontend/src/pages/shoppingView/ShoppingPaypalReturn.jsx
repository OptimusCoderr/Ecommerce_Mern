import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { capturePaymentThunk } from '../../redux/shop/orderSlice';
import { Card, CardHeader, CardTitle } from '../../components/ui/card';

const ShoppingPaypalReturn = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");
  
    useEffect(() => {
      if (paymentId && payerId) {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
  
        dispatch(capturePaymentThunk({ paymentId, payerId, orderId })).then((data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          }
        });
      }
    }, [paymentId, payerId, dispatch]);
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Processing Payment...Please wait!</CardTitle>
        </CardHeader>
      </Card>
    );
}

export default ShoppingPaypalReturn