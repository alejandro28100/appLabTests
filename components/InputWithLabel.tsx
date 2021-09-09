import React, { FC, InputHTMLAttributes } from 'react';

interface InputWithLabelProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	containerClassName?: string;
}

const InputWithLabel: FC<InputWithLabelProps> = ({ containerClassName, label, id, ...rest }) => (
	<div className={`${containerClassName} relative`}>
		<label className="absolute mx-3 p-1 bg-white font-normal leading-3 text-xs -translate-y-1/2" htmlFor={id}>
			{label}
		</label>
		<input
			{...rest}
			className="rounded-lg py-4 px-3 border-terciary border-[1px] leading-4 font-normal text-base w-full"
			id={id}
			type="text"
		/>
	</div>
);

export default InputWithLabel;
