import React from "react";
import { connect } from "react-redux";

function TotalOrder(props) {
  return (
    <div>
      <h1>Subtotal: {props.totalPrice} $</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    totalPrice: state.ItemReducer.items.totalPrice,
  };
};
const ConnectedCalculateTotal = connect(mapStateToProps)(TotalOrder);
export default ConnectedCalculateTotal;
