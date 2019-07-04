import React, { useContext } from "react";
import NightsAndPeople from "./NightsAndPeople";
import SpecialDiets from "./SpecialDiets";
import { ProgressContext } from "../contexts/ProgressContext";
import MealSelection from "./MealSelection";
import FourOhFour from "./FourOhFour";
import "./Content.scss";
import SideSelection from "./SideSelection";

export default function Content() {
	const { progress } = useContext(ProgressContext);
	const content = [<NightsAndPeople />, <SpecialDiets />, <MealSelection />, <SideSelection />];
	return <>{progress >= 0 && progress < content.length ? content[progress] : <FourOhFour />}</>;
}
