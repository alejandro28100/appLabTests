import React, { FC, InputHTMLAttributes } from 'react';

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
	imagePreview: string | undefined;
	containerClassName: string;
}

const FileInput: FC<FileInputProps> = ({ imagePreview, containerClassName, ...rest }) => (
	<div
		className={`${containerClassName} ml-auto mr-auto md:ml-0 shadow relative flex flex-col justify-center rounded`}
	>
		<div className="h-[108px] flex-grow bg-terciary flex items-center justify-center">
			{imagePreview ? (
				<img className="w-full h-full object-cover rounded-t" src={imagePreview} alt="" />
			) : (
				<img
					className="w-[52px] h-[52px] object-cover"
					aria-hidden
					src="/assets/svgs/upload_image.svg"
					alt=""
				/>
			)}
		</div>

		<div className="text-center">
			<p className="my-3 text-center font-normal text-[11px] leading-3">Arrastra tu archivo o</p>
			<button className="self-center btn secondary outlined mb-4">Selecciona</button>
		</div>

		<input {...rest} className="absolute top-0 left-0 w-full h-full opacity-0" type="file" />
	</div>
);

export default FileInput;
