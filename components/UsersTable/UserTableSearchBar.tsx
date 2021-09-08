import React, { FC, Dispatch, SetStateAction, ChangeEvent, Fragment } from 'react';
import Input from 'components/Input';
import { UserFilters } from './UsersTable';
import { Popover } from '@headlessui/react';

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
		<div className="mt-6 mb-4 flex ">
			<Input
				value={filters.name}
				onChange={handleInputChange}
				inputContainerClassName="bg-terciary w-[309px] rounded-[32px] hover:bg-terciary/80"
				className=" p-3 h-[42px]"
				leftIcon="/assets/svgs/searchGray.svg"
				placeholder="Buscar"
			/>
			<button className="mx-6 bg-terciary rounded-[4px] py-3 px-4 hover:bg-terciary/80">Buscar</button>

			<Popover className="relative">
				<Popover.Button
					title="Filtros de búsqueda"
					className="hover:bg-secondary/80 bg-secondary rounded-[4px] px-[9px] py-[10px]"
				>
					<img aria-hidden src="/assets/svgs/filter.svg" alt="" />
				</Popover.Button>

				<Popover.Panel className="absolute z-10 w-[356px] h-[342px] px-4 py-5 mt-[9px] bg-white shadow-lg">
					{({ close, open }) => (
						<Fragment>
							<div className="flex justify-between">
								<span className="font-medium">Filtros de búsqueda</span>
								<Popover.Button title="Cerrar Menú de Filtros de Búsqueda" onClick={() => close()}>
									<img aria-hidden src="/assets/svgs/close.svg" alt="" />
								</Popover.Button>
							</div>
							<hr className="h-px text-terciary my-5" />
							<div className="relative mb-6">
								<label className="absolute  mx-3 px-1 bg-white font-normal text-xs" htmlFor="job-area">
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
								<button className="bg-terciary hover:bg-terciary/70 font-normal py-3 px-4 rounded-[4px] ">
									Limpiar
								</button>
								<button className="bg-secondary hover:bg-secondary/70 text-white font-normal py-3 px-4 rounded-[4px]">
									Aplicar filtros
								</button>
							</div>
						</Fragment>
					)}
				</Popover.Panel>
			</Popover>
		</div>
	);
};

export default UserTableSearchBar;
