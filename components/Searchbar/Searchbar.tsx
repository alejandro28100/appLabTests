import Input from 'components/Input';
import React, { FC } from 'react';
import { getName } from 'utils/index';

// https://randomuser.me/api
interface Searchbar {
	/** User record from an api */
	user?: any;
	loading: boolean;
}

const Searchbar: FC<Searchbar> = ({ user, loading }) => {
	const name = getName(user);

	return (
		<div className="flex items-center justify-end bg-secondary w-full h-20 p-6">
			<Input rightIcon="/assets/svgs/search.svg" />
			<div className="w-px h-full bg-white mx-4 text-sm" />
			{!loading && user && <UserInfo name={name} picture={user.picture.thumbnail} />}
			<button>
				<img src="/assets/svgs/log-out.svg" alt="Cerrar Sesión" />
			</button>
		</div>
	);
};

interface UserInfoProps {
	name: string;
	picture: string;
}

const UserInfo: FC<UserInfoProps> = ({ name, picture }) => {
	return (
		<div className="flex align-center space-x-2 mx-5">
			<img className="rounded-full" src={picture} alt={`Foto de perfil de ${name}`} />
			<article className="text-white">
				<h3>{name}</h3>
				<p>Recursos Humanos</p>
			</article>
		</div>
	);
};

export default Searchbar;
