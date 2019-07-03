import React, { useContext, useState } from "react";
import "./MealSelection.scss";
import AvailableMeals from "./AvailableMeals";
import YourMeals from "./YourMeals";
import { UserDataContext } from "../contexts/UserDataContext";
import { ProgressContext } from "../contexts/ProgressContext";
import ContinueMessage from "./ContinueMessage";

export default function SideSelection() {
	const [displayError, updateDisplayError] = useState(false);
	const { progress, updateProgress } = useContext(ProgressContext);
	const { userData, updateUserData } = useContext(UserDataContext);
	const { meals, nights, selectedMealCount } = userData;
	const canContinue = !(nights - selectedMealCount);

	// Add a meal to the selected meals list if the list is not full
	const addSelectedMeal = (index, title, image) => {
		if (selectedMealCount < nights) {
			updateUserData({
				...userData,
				selectedMealCount: selectedMealCount + 1,
				meals: [
					...meals.slice(0, selectedMealCount),
					{ title, image, selected: true },
					...meals.slice(selectedMealCount + 1)
				]
			});
		}
	};

	// Remove a meal from the selected meals list if the list is not empty
	const removeSelectedMeal = index => {
		if (selectedMealCount > 0) {
			updateUserData({
				...userData,
				selectedMealCount: selectedMealCount - 1,
				meals: [...meals.slice(0, index), ...meals.slice(index + 1), {}]
			});
		}
	};

	// Continue to next step if the user has selected all their meals
	const continueClick = () => {
		canContinue ? updateProgress(progress + 1) : updateDisplayError(true);
	};

	return (
		<div className="meal-selection">
			<h2>Select sides to go with your meal</h2>
			{(displayError || canContinue) && (
				<ContinueMessage continueClick={continueClick} displayError={displayError} />
			)}
			<div className="meal-selection-wrapper">
				<YourMeals
					selectedMeals={meals}
					removeSelectedMeal={removeSelectedMeal}
					selectedMealCount={selectedMealCount}
					nights={nights}
					continueClick={continueClick}
				/>
				<AvailableMeals type="sides" addSelectedMeal={addSelectedMeal} />
			</div>
		</div>
	);
}
