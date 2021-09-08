import React, { Fragment, FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<{}> {
	/** svg file source */
	rightIcon?: string;
	/** svg file source */
	leftIcon?: string;

	/** container className prop */
	inputContainerClassName?: string;
}

const Input: FC<InputProps> = ({ leftIcon, rightIcon, className, inputContainerClassName, ...rest }) => {
	return (
		<Fragment>
			<div className={`${inputContainerClassName} flex items-center`}>
				{leftIcon && (
					<span className="mx-2">
						<img aria-hidden src={leftIcon} alt="" />
					</span>
				)}
				<input {...rest} type="text" className={`${className} bg-transparent focus:outline-none w-full`} />
				{rightIcon && (
					<span className="mx-2">
						<img aria-hidden src={rightIcon} alt="" />
					</span>
				)}
			</div>
		</Fragment>
	);
};

Input.defaultProps = {
	className: ''
};

export default Input;
