import { useState, useCallback, useEffect } from "react";

// triggerList should be providad in the order os specificity
const useContextMenu = ({ triggersList = [] } = {}) => {
	const [xPos, setXPos] = useState("0px");
	const [yPos, setYPos] = useState("0px");
	const [showMenu, setShowMenu] = useState(false);
	const [target, setTarget] = useState(null);

	const handleContextMenu = useCallback(
		(e) => {
			const el = triggersList.reduce(
				(acc, el) => acc || e.target.closest(el),
				false
			);

			if (el) {
				e.preventDefault();
				setXPos(`${e.pageX}px`);
				setYPos(`${e.pageY}px`);
				setShowMenu(true);
				setTarget(el);
			}
		},
		[setXPos, setYPos]
	);

	const handleClick = useCallback(() => showMenu && setShowMenu(false), [
		showMenu,
	]);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		document.addEventListener("contextmenu", handleContextMenu);
		return () => {
			document.addEventListener("click", handleClick);
			document.removeEventListener("contextmenu", handleContextMenu);
		};
	});

	return { xPos, yPos, showMenu, target, setShowMenu };
};

export default useContextMenu;
