import React, { useContext } from "react";
import "./DessertSelection.scss";
import Meals from "./Meals";
import YourDesserts from "./YourDesserts";
import { UserDataContext } from "../contexts/UserDataContext";

export default function DessertSelection() {
	const { userData, updateUserData } = useContext(UserDataContext);
	const { desserts } = userData;
	// Add a meal to the selected desserts list
	const addSelectedDessert = (index, title, image, price, id) => {
		// If the dessert already exists in the array, update its quantity, else add it with quantity x 1
		for (let i = 0; i < desserts.length; i++) {
			if (desserts[i].id === id) {
				updateUserData({
					...userData,
					desserts: [
						...desserts.slice(0, i),
						{ title, image, price, id, quantity: desserts[i].quantity + 1 },
						...desserts.slice(i + 1)
					]
				});
				return;
			}
		}
		updateUserData({
			...userData,
			desserts: [...desserts, { title, image, price, id, quantity: 1 }]
		});
	};

	// Remove a meal from the selected desserts list
	const removeSelectedDessert = index => {
		if (desserts[index].quantity === 1) {
			updateUserData({
				...userData,
				desserts: [...desserts.slice(0, index), ...desserts.slice(index + 1)]
			});
		} else {
			const { title, image, price, id, quantity } = desserts[index];
			updateUserData({
				...userData,
				desserts: [
					...desserts.slice(0, index),
					{ title, image, price, id, quantity: quantity - 1 },
					...desserts.slice(index + 1)
				]
			});
		}
	};
	return (
		<div className="content meal-selection">
			<h2 className="header uppercase">Select desserts to go with your meal</h2>
			<YourDesserts selectedDesserts={desserts} removeSelectedDessert={removeSelectedDessert} />
			<Meals type="desserts" addSelectedMeal={addSelectedDessert} buttons={false} />
			<div className="footer" />
		</div>
	);
}