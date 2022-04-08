import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const orderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: `/api/payments`,
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push("/orders"),
  });
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    //   findTimeLeft() is return a function, so we can use it as a callback
    findTimeLeft();

    const timerId = setInterval(findTimeLeft, 1000);
    //   if rerender, the timer will be cleared
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return (
      <div>
        <h1>Order Expired</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>{timeLeft} seconds: Time left pay</h1>
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51KlqbZAe01W97lnZyEPXO0HjbrNY7uwVFoxfIzBLvEtng5MReD8aEGmBpjS25Yd1HXG21tMlLXWOXsIxMjjpYGBg00OPtywSwO"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

orderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default orderShow;
