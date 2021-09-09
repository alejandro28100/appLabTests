import React, { FC, SelectHTMLAttributes } from 'react';

interface SelectWithLabelProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	id: string;
	containerClassName: string;
}

const SelectWithLabel: FC<SelectWithLabelProps> = ({ label, containerClassName, id, children, ...rest }) => (
	<div className={`w-[308px] my-[30px] ${containerClassName}`}>
		<label className="absolute mx-3 px-1 bg-white font-normal text-xs -translate-y-1/2" htmlFor={id}>
			{label}
		</label>
		<select {...rest} id={id} className="py-5 px-3 border-[1px] border-terciary rounded-lg w-full">
			{children}
		</select>
	</div>
);

export default SelectWithLabel;
