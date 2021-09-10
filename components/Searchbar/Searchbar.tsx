import Input from 'components/Input';
import React, { FC } from 'react';

interface UserProps {
	name: string;
	picture: string;
	area: string;
}

interface Searchbar {
	user: UserProps;
	loading: boolean;
	handleToggleSidebar: () => void;
}

const Searchbar: FC<Searchbar> = ({ user, loading, handleToggleSidebar }) => {
	return (
		<div className="flex items-center bg-secondary w-full h-20 p-6">
			<div className="flex-grow">
				<button title="Abrir Menú" className="lg:hidden w-5 h-5" onClick={handleToggleSidebar}>
					<img src="/assets/svgs/menu.svg" alt="" />
				</button>
			</div>
			<Input
				inputContainerClassName="text-white transition-colors ease duration-300  border-b-2 border-transparent focus-within:border-white"
				rightIcon="/assets/svgs/search.svg"
			/>
			<div className="w-px h-full bg-white mx-4 text-sm" />
			{!loading && user && <UserInfo {...user} />}
			<button>
				<img src="/assets/svgs/log-out.svg" alt="" />
			</button>
		</div>
	);
};

const UserInfo: FC<UserProps> = ({ name, picture, area }) => {
	return (
		<div className="flex align-center space-x-2 mx-5">
			<img className="rounded-full w-10 h-10 object-cover" src={picture} alt={name} />
			<article className="text-white hidden lg:block">
				<h3>{name}</h3>
				<p>{area}</p>
			</article>
		</div>
	);
};

export default Searchbar;
