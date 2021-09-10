import React, { FC, Dispatch, SetStateAction, ChangeEvent, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Input from 'components/Input';
import { Popover } from '@headlessui/react';

import { UserFilters } from './UsersTable';

interface UserTableSearchBarProps {
	filters: UserFilters;
	setFilters: Dispatch<SetStateAction<UserFilters>>;
}

const UserTableSearchBar: FC<UserTableSearchBarProps> = ({ filters, setFilters }) => {
	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		setFilters((prev) => ({ ...prev, name: value }));
	}

	return (
		<div className="mt-6 mb-4 flex flex-col md:flex-row md:mx-0 items-center justify-center md:justify-between">
			<div className="flex my-2 md:my-0 items-center">
				<Input
					value={filters.name}
					onChange={handleInputChange}
					inputContainerClassName="bg-terciary flex-grow md:my-0 md:w-[309px] rounded-[32px] hover:bg-terciary/80"
					className=" p-3 h-[42px]"
					leftIcon="/assets/svgs/searchGray.svg"
					placeholder="Buscar"
				/>
				<button className="mx-3 lg:mx-6 justify-end btn terciary md:my-0">Buscar</button>

				<Popover className="relative">
					<Popover.Button
						title="Filtros de búsqueda"
						className="hover:bg-secondary/80 bg-secondary rounded-[4px] px-[9px] py-[10px] hover:brightness-90"
					>
						<Image layout="fill" src="/assets/svgs/filter.svg" alt="" />
					</Popover.Button>

					<Popover.Panel className="right-0 md:left-0 absolute z-10 w-[300px] md:w-[356px] h-[342px] px-4 py-5 mt-[9px] bg-white shadow-lg">
						{({ close }) => (
							<Fragment>
								<div className="flex justify-between">
									<span className="font-medium">Filtros de búsqueda</span>
									<Popover.Button title="Cerrar Menú de Filtros de Búsqueda" onClick={() => close()}>
										<Image layout="fill" src="/assets/svgs/close.svg" alt="" />
									</Popover.Button>
								</div>
								<hr className="h-px text-terciary my-5" />
								<div className="relative mb-6">
									<label
										className="absolute  mx-3 px-1 bg-white font-normal text-xs"
										htmlFor="job-area"
									>
										Área
									</label>
									<select
										id="job-area"
										className="py-5 px-4 border-[1px] border-terciary rounded-lg w-full"
									>
										<option value="">Recursos Humanos</option>
									</select>
								</div>
								<div className="relative">
									<label
										className="absolute mx-3 px-1 bg-white font-normal text-xs"
										htmlFor="user-status"
									>
										Estatus
									</label>
									<select
										className="py-5 px-4 border-[1px] border-terciary rounded-lg w-full"
										id="user-status"
									>
										<option value="">Activo</option>
										<option value="">Inactivo</option>
									</select>
								</div>
								<hr className="h-px text-terciary mt-5 mb-6" />
								<div className="space-x-6">
									<button className="btn terciary">Limpiar</button>
									<button className="btn secondary">Aplicar filtros</button>
								</div>
							</Fragment>
						)}
					</Popover.Panel>
				</Popover>
			</div>

			<div className="md:ml-4 space-x-4 flex justify-center items-center">
				<button className="btn secondary outlined flex-shrink-0">Descargar</button>
				<Link href="/users/add">
					<a className="btn secondary flex-shrink-0">Agregar nuevo admin</a>
				</Link>
			</div>
		</div>
	);
};

export default UserTableSearchBar;
