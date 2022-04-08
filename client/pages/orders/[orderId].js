import { useEffect, useState } from "react";

const orderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
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
    </div>
  );
};

orderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default orderShow;
