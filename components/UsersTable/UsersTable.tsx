import React, { useEffect, useState, useCallback } from 'react';
import { getRandomStatus, getName, getFirstItem, getLastItem, getRangeString, nextPageExist } from 'utils/index';
import UserRow from './UserRow';
import UserTableSearchBar from './UserTableSearchBar';

export interface UserFilters {
	name: string | undefined;
	area: string | undefined;
	status: boolean | undefined;
}

const UsersTable = () => {
	const [ users, setUsers ] = useState<any[]>([]);
	const [ filteredUsers, setFilteredUsers ] = useState<any[]>([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(1);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);
	const [ filters, setFilters ] = useState<UserFilters>({
		name: '',
		area: undefined,
		status: undefined
	});

	const { name = '', status, area } = filters;
	const shouldFilter = name.length > 0 || status !== undefined || area !== undefined;
	/** Create a memoized function to avoid unecessary calculations 
	 * when filters do not change 
	 * 
	 * returns filtered users
	 * */
	const usersWithFilters = useCallback(
		(): any[] => {
			return [ ...users ].filter((user) => {
				let matches = false;
				if (name.length > 0) {
					const userName = getName(user);
					matches = userName.toLowerCase().includes(name.trim().toLowerCase());
				}
				return matches;
			});
		},
		[ users, filters ]
	);

	/** Fetch fake user data on component mount */
	useEffect(() => {
		(async function() {
			try {
				const result = await fetch('https://randomuser.me/api/?nat=es&results=100');
				const json = await result.json();
				setUsers(json.results);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);
	/** Every time filters change make sure the pagination is reseted */
	useEffect(
		() => {
			setPage(1);
		},
		[ filters ]
	);

	useEffect(
		() => {
			if (!loading && users.length > 0) {
				const start = rowsPerPage * page - rowsPerPage;
				const end = start + rowsPerPage;

				const newFilteredUsers = shouldFilter ? usersWithFilters() : [ ...users ];
				setFilteredUsers(newFilteredUsers.slice(start, end));
			}
		},
		[ page, rowsPerPage, loading, filters ]
	);

	return (
		<section>
			<UserTableSearchBar filters={filters} setFilters={setFilters} />
			{loading ? (
				'Cargando usuarios'
			) : !loading && filteredUsers.length > 0 ? (
				<div className="my-4 flex flex-col text-left ">
					<div className="flex items-center col-span-12 h-[56px] font-semibold text-sm">
						<div className="w-[60px] text-center">
							<input aria-disabled type="checkbox" />
						</div>
						<div className="xl:w-[250px] 2xl:w-[303px]">
							Administradores
							<button>
								<img className="inline-block mx-4" src="/assets/svgs/arrow-down.svg" aria-hidden />
							</button>
						</div>
						<div className="w-[165px]">Área</div>
						<div className="xl:w-[230px] 2xl:w-[263px]">Correo</div>
						<div className="xl:w-[110px] 2xl:w-[178px]">Estatus</div>
						<div className="w-[118px]">Detalles</div>
					</div>

					{filteredUsers.map((user: any) => (
						<UserRow
							key={user.login.uuid}
							{...{
								id: user.login.uuid,
								picture: user.picture.thumbnail,
								email: user.email,
								name: getName(user),
								area: 'Recursos Humanos',
								isActive: getRandomStatus()
							}}
						/>
					))}
					<div className="flex justify-end items-center col-span-12 my-5">
						<div className="mx-11">
							Rows per page:
							<input
								title="Cambiar número de usuarios por página"
								className=" mx-2 w-14 text-center"
								type="number"
								value={rowsPerPage}
								onChange={(e) => setRowsPerPage(parseInt(e.target.value) || 0)}
							/>
						</div>
						<div>
							{`${getRangeString(
								getFirstItem(page, rowsPerPage),
								getLastItem(page, rowsPerPage, usersWithFilters().length || users.length)
							)} of ${shouldFilter ? usersWithFilters().length : users.length}`}
						</div>
						<div className="mx-11 space-x-7">
							<button
								className="disabled:opacity-40"
								title="Página anterior"
								disabled={page <= 1}
								onClick={() => setPage((prev) => --prev)}
							>
								<img aria-hidden src="/assets/svgs/arrow-left.svg" />
							</button>
							<button
								className="disabled:opacity-40"
								disabled={nextPageExist(
									page,
									rowsPerPage,
									shouldFilter ? usersWithFilters().length : users.length
								)}
								title="Siguiente página"
								onClick={() => setPage((prev) => ++prev)}
							>
								<img aria-hidden src="/assets/svgs/arrow-right.svg" />
							</button>
						</div>
					</div>
				</div>
			) : (
				<p>Ningún usuario fué encontrado</p>
			)}
		</section>
	);
};

export default UsersTable;
