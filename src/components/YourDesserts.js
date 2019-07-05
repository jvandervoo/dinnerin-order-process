import React, { useContext } from "react";
import "./YourDesserts.scss";
import { ProgressContext } from "../contexts/ProgressContext";

export default function YourDesserts({ selectedDesserts, removeSelectedDessert }) {
	const { progress, updateProgress } = useContext(ProgressContext);
	const subtotal = selectedDesserts
		.reduce((total, current) => total + parseFloat(current.price * current.quantity), 0)
		.toFixed(2);
	return (
		<>
			<div className="your-desserts">
				<div className="header">
					<h3 className="uppercase">Your desserts</h3>
				</div>
				{selectedDesserts.map((item, index) => (
					<div className="selected-dessert primary-color" key={item.id}>
						<div className="title">
							<span className="remove" onClick={() => removeSelectedDessert(index)}>
								-
							</span>
							{`${item.title} x${item.quantity}`}
						</div>
						<span className="price">{`$${(item.price * item.quantity).toFixed(2)}`}</span>
					</div>
				))}
				<div className="footer">
					<div className="subtotal primary-color">
						<span className="uppercase ">Subtotal</span>
						<span className="price">{`$${subtotal}`}</span>
					</div>
					<button className="uppercase button" onClick={() => updateProgress(progress + 1)}>
						Continue
					</button>
				</div>
			</div>
		</>
	);
}