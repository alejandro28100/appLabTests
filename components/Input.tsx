import React, { Fragment, FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<{}> {
	/** svg file source */
	rightIcon?: string;
}

const Input: FC<InputProps> = ({ rightIcon, className, ...rest }) => {
	return (
		<Fragment>
			<div className="flex items-center  border-b-2 border-transparent focus-within:border-white">
				<input
					{...rest}
					type="text"
					className={`${className} bg-secondary text-white focus:outline-none w-full`}
				/>
				{rightIcon && (
					<span>
						<img aria-hidden src={rightIcon} alt="" />
					</span>
				)}
			</div>
		</Fragment>
	);
};

export default Input;
