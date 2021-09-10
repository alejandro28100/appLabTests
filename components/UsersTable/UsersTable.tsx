import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';

import UserRow from './UserRow';
import UserTableSearchBar from './UserTableSearchBar';

import {
	getRandomStatus,
	getName,
	getFirstItem,
	getLastItem,
	getRangeString,
	nextPageExist,
	matchesName
} from 'utils/index';

export interface UserFilters {
	name: string | undefined;
	area: string | undefined;
	status: boolean | undefined;
}

const UsersTable = () => {
	const [ users, setUsers ] = useState<any[]>([]);
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
	 * 
	 * returns filtered users paginated
	 * */
	const getFilteredUsers = useCallback(
		(): any[] => {
			if (loading && users.length < 0) return [];
			//First idx in page
			const start = rowsPerPage * page - rowsPerPage;
			//Last idx in page
			const end = start + rowsPerPage;
			if (shouldFilter) {
				// When filters change pagination is reseted
				const start = rowsPerPage * 1 - rowsPerPage;
				return [ ...users ]
					.filter((user) => {
						let matches = false;
						const userName = getName(user);
						matches = matchesName(userName, name);
						/** Extra filters here */
						/**{...} */
						return matches;
					})
					.slice(start, end);
			}
			return [ ...users ].slice(start, end);
		},
		[ users, filters, page, rowsPerPage, loading, shouldFilter, name ]
	);
	const totalUsersCount = users.length;
	const filteredUsers = getFilteredUsers();
	const filteredUsersCount = filteredUsers.length;

	const totalUsers = shouldFilter && filteredUsersCount < totalUsersCount ? filteredUsersCount : totalUsersCount;

	/** Fetch fake user data on component mount */
	useEffect(() => {
		(async function() {
			try {
				const result = await fetch('https://randomuser.me/api/?nat=es&results=100&seed=appLab');
				const json = await result.json();
				setUsers(json.results);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);
	/** Every time filters change make sure pagination is reseted */
	useEffect(
		() => {
			setPage(1);
		},
		[ filters ]
	);

	function deleteUser(userID: string) {
		setUsers((users) => users.filter((user) => user.login.uuid !== userID));
	}

	function handleNextPage() {
		setPage((prev) => ++prev);
	}

	function handlePrevPage() {
		setPage((prev) => --prev);
	}
	function handleChangeRowPerPage(e: ChangeEvent<HTMLInputElement>) {
		const value = parseInt(e.target.value) || 1;
		setRowsPerPage(value);
	}
	/** Return current range of items in the table view
	 * 
	 * e.g. => 1-5 of 100
	 */
	const currentTableRange = `${getRangeString(
		getFirstItem(page, rowsPerPage),
		getLastItem(page, rowsPerPage, totalUsers)
	)} of ${totalUsers}`;

	return (
		<section>
			<UserTableSearchBar filters={filters} setFilters={setFilters} />
			{loading ? (
				'Cargando usuarios'
			) : !loading && filteredUsersCount > 0 ? (
				<div className="my-4 flex flex-col text-left overflow-x-auto">
					<div className="flex items-center w-[996px] lg:w-auto h-[56px] font-semibold text-sm">
						<div className="flex-shrink-0 w-[60px] text-center">
							<input aria-disabled type="checkbox" />
						</div>
						<div className="flex-shrink-0 w-[250px] 2xl:w-[303px]">
							Administradores
							<button>
								<img alt="" className="inline-block mx-4" src="/assets/svgs/arrow-down.svg" />
							</button>
						</div>
						<p className="flex-shrink-0 w-[165px]">Área</p>
						<p className="flex-shrink-0 w-[230px] 2xl:w-[263px]">Correo</p>
						<p className="flex-shrink-0 w-[110px] 2xl:w-[178px]">Estatus</p>
						<p className="flex-shrink-0 w-[118px]">Detalles</p>
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
								isActive: getRandomStatus(),
								deleteUser
							}}
						/>
					))}
					<div className="flex flex-shrink-0 justify-start md:justify-end items-center col-span-12 my-5">
						<div className="md:mx-11">
							Rows per page:
							<input
								title="Cambiar número de usuarios por página"
								className=" mx-2 md:w-14 text-center"
								type="number"
								value={rowsPerPage}
								min={1}
								max={totalUsers}
								onChange={handleChangeRowPerPage}
							/>
						</div>
						<div>{currentTableRange}</div>
						<div className="mx-4 md:mx-11 text-xs md:text-base space-x-4 md:space-x-7 flex items-center">
							<button
								className="disabled:opacity-40"
								title="Página anterior"
								disabled={page <= 1}
								onClick={handlePrevPage}
							>
								<img alt="" src="/assets/svgs/arrow-left.svg" />
							</button>
							<button
								className="disabled:opacity-40"
								disabled={!nextPageExist(page, rowsPerPage, totalUsers)}
								title="Siguiente página"
								onClick={handleNextPage}
							>
								<img alt="" src="/assets/svgs/arrow-right.svg" />
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
