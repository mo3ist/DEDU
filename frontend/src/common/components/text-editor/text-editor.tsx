import React, { useState } from "react"
import JoditEditor from "jodit-react";

import "./text-editor.css"

interface Props {
	readonly?: boolean;
	formattingonly?: boolean;
	value?: string | null;
	ref?: React.RefObject<JoditEditor>;
	onBlur?: ((value: string) => void) | undefined;
	onChange?: ((value: string) => void) | undefined;
}

const TextEditor: React.FC<Props> = ({ readonly=false, formattingonly=false, value, ref, onBlur, onChange }) => {
	
	const readonlyConfig = {
		readonly: true,
		toolbar: false,
		showCharsCounter: false,
		showWordsCounter: false,
		showXPathInStatusbar: false,
		disablePlugins: "mobile"	// THIS LITTLE FUCKER AUTOFOCUSED ON STATE CHANGE.
	}

	const formattingonlyConfig = {
		placeholder: "اكتب هنا...",
		buttons: "bold,italic,underline,strikethrough,|,eraser,superscript,subscript,",
		buttonsMD: "bold,italic,underline,strikethrough,|,eraser,superscript,subscript,",
		buttonsXS: "bold,italic,underline,strikethrough,|,eraser,superscript,subscript,",
		disablePlugins: "mobile"
	}

	const config = {
		uploader: {
			insertImageAsBase64URI: true,
		  },
		placeholder: "اكتب هنا...",
		buttons: "bold,italic,underline,strikethrough,|,eraser,superscript,subscript,ul,ol,indent,outdent,left,|,link,image,|,cut,copy,paste,selectall",
		buttonsMD: "bold,italic,underline,strikethrough,|,eraser,superscript,subscript,ul,ol,indent,outdent,left,|,link,image,|,cut,copy,paste,selectall",
		buttonsXS: "bold,italic,underline,strikethrough,|,eraser,superscript,subscript,ul,ol,indent,outdent,left,|,link,image,|,cut,copy,paste,selectall",
		disablePlugins: "mobile"
	}

	return (
		<div
			className="h-full w-full"
		>
			<JoditEditor 
				value={value!}
				config={readonly ? readonlyConfig : (formattingonly ? formattingonlyConfig : config)}
				onBlur={onBlur}
				onChange={onChange}
				ref={ref}
			/>
		</div>
	)
}

export default TextEditor;