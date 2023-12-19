import React from "react";

// Figure out what inputs we want
type RequestProps = {
	title?: string;
	image?: string;
	item?: string;
}

const RequestView = ({
	title,
	image,
	item
}: RequestProps) => {

	return (
		<div className="mx-5 mt-3 rounded-lg bg-white">
			content here
		</div>
	)
}

// Unsure what a repair request actually is, how it works, making a basic box anyway.

export default RequestView;