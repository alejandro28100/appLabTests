import React, { useEffect, useState, FC } from 'react';
import { getRandomStatus, getName } from 'utils/index';
import UserRow from './UserRow';

const UsersTable = () => {
	const [ users, setUsers ] = useState<any>(undefined);
	const [ filteredUsers, setFilteredUsers ] = useState<any>([]);
	const [ loading, setLoading ] = useState(true);
	const [ page, setPage ] = useState(1);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

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

	useEffect(
		() => {
			if (!loading && users.length > 0) {
				const start = rowsPerPage * page - rowsPerPage;
				const end = start + rowsPerPage;
				setFilteredUsers([ ...users ].slice(start, end));
			}
		},
		[ page, rowsPerPage, loading ]
	);

	return (
		<section>
			{loading ? (
				'Cargando usuarios'
			) : !loading && users.length > 0 ? (
				<div className="my-4 grid grid-col-12 w-full text-left">
					<div className="flex items-center col-span-12 h-[56px]">
						<div className="w-[60px] text-center">
							<input aria-disabled type="checkbox" />
						</div>
						<div className="w-[303px]">
							Administradores
							<button>
								<img className="inline-block mx-4" src="/assets/svgs/arrow-down.svg" aria-hidden />
							</button>
						</div>
						<div className="w-[165px]">Área</div>
						<div className="w-[263px]">Correo</div>
						<div className="w-[178px]">Estatus</div>
						<div className="w-auto">Detalles</div>
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
						<div className="">
							{`${page * rowsPerPage - rowsPerPage + 1}-${rowsPerPage * page} of ${users.length}`}
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
								disabled={page * rowsPerPage + rowsPerPage - 1 > users.length}
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
