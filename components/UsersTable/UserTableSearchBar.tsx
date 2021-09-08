import Input from 'components/Input';
import React, { FC, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { UserFilters } from './UsersTable';

interface UserTableSearchBarProps {
	filters: object;
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
				onChange={handleInputChange}
				inputContainerClassName="bg-terciary w-[309px] rounded-[32px] hover:bg-terciary/80"
				className=" p-3 h-[42px]"
				leftIcon="/assets/svgs/searchGray.svg"
				placeholder="Buscar"
			/>
			<button className="mx-6 bg-terciary rounded-[4px] py-3 px-4 hover:bg-terciary/80">Buscar</button>
			<button
				title="Filtros de búsqueda"
				className="hover:bg-secondary/80 bg-secondary rounded-[4px] px-[9px] py-[10px]"
			>
				<img aria-hidden src="/assets/svgs/filter.svg" alt="" />
			</button>
		</div>
	);
};

export default UserTableSearchBar;
