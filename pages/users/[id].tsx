import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import { useRouter } from 'next/router';

import Sidebar from 'components/Sidebar/Sidebar';
import Searchbar from 'components/Searchbar/Searchbar';

import { fakeAdminUser, getName } from 'utils/index';

interface User {
	name: {
		first: string;
		last: string;
	};
	email: string;
	picture: string;
	area: string;
	isActive: boolean;
}

const UserProfile: NextPage = (props) => {
	const router = useRouter();

	// / Use type any because we do not know the user date interface
	const [ user, setUser ] = useState<User | undefined>(undefined);
	const [ loading, setLoading ] = useState(true);
	const [ isEditing, setIsEditing ] = useState(false);
	const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);

	function handleToggleSidebar() {
		setIsSidebarOpen((prev) => !prev);
	}

	useEffect(
		() => {
			// Fake fetching user data on mount
			(function() {
				if (!router.isReady) return;
				try {
					setUser({
						name: {
							first: 'Andrés',
							last: 'Ramirez'
						},
						email: 'andrés.ramirez@gmail.com',
						picture:
							'https://images.pexels.com/photos/7252301/pexels-photo-7252301.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
						area: 'Recursos Humanos',
						isActive: true
					});

					/**
				 * Router Query Params are undefined on mount because of Next JS 
				 * SSR Optimization for static pages.
				 * Query params become available after page hydration
				 * We should wait until router.isReady is true 
				 * to get access to the router.query properties 
				 */
					setIsEditing(Boolean(router.query.edit));
				} catch (error) {
					console.error('Error getting the user');
				} finally {
					setLoading(false);
				}
			})();
		},
		[ router ]
	);

	function handleEditUser() {
		setIsEditing((prevValue) => !prevValue);
	}

	function handleOnUserChange(e: ChangeEvent<HTMLInputElement>, prop: 'name first' | 'name last' | 'email' | 'area') {
		const value = e.target.value;

		const [ key, subKey ] = prop.split(' ');
		if (key === 'name' && subKey) {
			return setUser(
				(user) =>
					({
						...user,
						name: {
							...user?.name,
							[subKey]: value
						}
					} as User)
			);
		}
		return setUser(
			(user) =>
				({
					...user,
					[prop]: value
				} as User)
		);
	}

	const userName = getName(user);

	return (
		<Fragment>
			<Head>
				<title>GLI App | Cursos y Certificaciones</title>
			</Head>
			<div className="flex">
				<Sidebar isOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />
				<div className="w-full flex flex-col">
					<Searchbar handleToggleSidebar={handleToggleSidebar} user={fakeAdminUser} loading={loading} />
					<nav className="pt-8 pl-8">
						<ol className="flex">
							<li
								after-content=">"
								className="after:text-secondary after after:content-[attr(after-content)] after:inline-block"
							>
								Inicio
							</li>
							<li className="text-secondary">Administradores</li>
						</ol>
					</nav>
					<main className="px-[33px] pb-[33px]">
						<h1 className="font-semibold text-xl">Perfil de administrador</h1>
						{!loading &&
						user && (
							<section>
								<div className="my-6 flex flex-col items-center md:block">
									<img
										className="my-1 w-[100px] h-[100px] md:w-[52px] md:h-[52px] rounded-full object-cover"
										src={user.picture}
										alt={`Foto de perfil de ${userName}`}
									/>
									<p className="text-lg font-semibold">{userName}</p>
									<div className="flex flex-col md:flex-row">
										<div className="w-64 flex-shrink-0 uppercase mx-1">
											<label
												className="block font-normal text-primary/60 leading-8 text-xs"
												htmlFor="name"
											>
												Nombre (s)
											</label>
											<input
												onChange={(e) => handleOnUserChange(e, 'name first')}
												disabled={!isEditing}
												className={`leading-6 font-semibold w-full ${isEditing
													? 'bg-terciary'
													: 'bg-transparent'} rounded-lg px-2 py-1`}
												type="text"
												value={user.name.first}
											/>
										</div>
										<div className="w-64 flex-shrink-0 uppercase mx-1 my-2 md:my-0">
											<label
												className="block font-normal text-primary/60 leading-8 text-xs"
												htmlFor="name"
											>
												Apellidos
											</label>
											<input
												onChange={(e) => handleOnUserChange(e, 'name last')}
												disabled={!isEditing}
												className={`leading-6 font-semibold w-full ${isEditing
													? 'bg-terciary'
													: 'bg-transparent'} rounded-lg px-2 py-1`}
												type="text"
												value={user.name.last}
											/>
										</div>
										<div className="w-64 flex-shrink-0 uppercase mx-1 my-2 md:my-0">
											<label
												className="block font-normal text-primary/60 leading-8 text-xs"
												htmlFor="name"
											>
												Correo Electrónico
											</label>
											<input
												onChange={(e) => handleOnUserChange(e, 'email')}
												disabled={!isEditing}
												className={`leading-6 font-semibold w-full ${isEditing
													? 'bg-terciary'
													: 'bg-transparent'} rounded-lg px-2 py-1`}
												type="text"
												value={user.email}
											/>
										</div>
									</div>
									<div className="flex flex-col md:flex-row">
										<div className="w-64 flex-shrink-0 uppercase mx-1 my-2 md:my-0">
											<label
												className="block font-normal text-primary/60 leading-8 text-xs"
												htmlFor="name"
											>
												Área
											</label>
											<input
												onChange={(e) => handleOnUserChange(e, 'area')}
												disabled={!isEditing}
												className={`leading-6 font-semibold w-full ${isEditing
													? 'bg-terciary'
													: 'bg-transparent'} rounded-lg px-2 py-1`}
												type="text"
												value={user.area}
											/>
										</div>
										<div className="w-64 uppercase mx-1 my-2 md:my-0">
											<p className="block font-normal text-primary/60 text-xs leading-8">
												Estatus
											</p>
											<p className="leading-6 font-semibold w-full ">Activo</p>
										</div>
									</div>
									<hr className="mt-8 text-terciary h-px w-full" />
									<div className="my-4">
										<button onClick={handleEditUser} className="btn secondary">
											{isEditing ? 'Guardar Cambios' : 'Editar Administador'}
										</button>
									</div>
								</div>
							</section>
						)}
					</main>
				</div>
			</div>
		</Fragment>
	);
};

export default UserProfile;
