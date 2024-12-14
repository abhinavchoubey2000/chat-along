import React from "react";
import { Tooltip, Zoom } from "@mui/material";

interface CustomToolTipPropsInterface {
	children: React.ReactElement;
	title: string;
	arrow: boolean;
	placement: "top" | "left" | "right" | "bottom";
}

export function CustomToolTip({
	children,
	title,
	placement,
}: CustomToolTipPropsInterface) {
	return (
		<Tooltip
			placement={placement}
			title={title}
			arrow={true}
			slots={{
				transition: Zoom,
			}}
		>
			{children}
		</Tooltip>
	);
}
