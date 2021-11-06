import React, { useState } from "react"
import JoditEditor from "jodit-react";

import "./text-editor.css"

interface Props {
	readonly: boolean;
	value?: string | null;
	ref?: React.RefObject<JoditEditor>;
	onBlur?: ((value: string) => void) | undefined;
}

const TextEditor: React.FC<Props> = ({ readonly=false, value, ref, onBlur }) => {
	
	const readonlyConfig = {
		readonly: true,
		toolbar: false,
		showCharsCounter: false,
		showWordsCounter: false,
		showXPathInStatusbar: false,
	}

	const config = {
		uploader: {
			insertImageAsBase64URI: true,
		  },
		placeholder: "اكتب هنا...",
		buttons: "bold,italic,underline,strikethrough,|,eraser,superscript,subscript,ul,ol,indent,outdent,left,|,link,image,|,cut,copy,paste,selectall",
	}

	return (
		<div
			className="h-full w-full"
		>
			<JoditEditor 
				value={value!}
				config={readonly ? readonlyConfig : config}
				onBlur={onBlur}
				ref={ref}
			/>
		</div>
	)
}

export default TextEditor;