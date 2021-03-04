import React, { useContext } from "react";
import useContextMenu from "../hooks/useContextMenu";


const ContextMenu = ({ triggersList, children }) => {
	const { xPos, yPos, showMenu, target, setShowMenu } = useContextMenu({ triggersList });

	if (!showMenu) return null;

	return (
		<div
			className="context-menu"
			style={{
				top: yPos,
				left: xPos,
			}}
		>
			{typeof children === 'function' ? children({ target, setShowMenu }) : children}
		</div>
	);
};

export default ContextMenu;
