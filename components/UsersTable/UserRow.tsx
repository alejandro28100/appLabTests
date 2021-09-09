import { FC } from 'react';
import Link from 'next/link';

interface UserRowProps {
	id: string;
	picture: string;
	name: string;
	area: string;
	email: string;
	/** Whether the user is active */
	isActive: boolean;
}

const UserRow: FC<UserRowProps> = ({ picture, area, name, email, isActive }) => {
	return (
		<div className="flex align-items w-full col-span-12 h-[72px] hover:bg-terciary text-sm border-t-[1px] border-b-[1px] border-terciary">
			<div className="flex items-center justify-center w-[60px] text-center">
				<input aria-disabled type="checkbox" />
			</div>
			<div className="xl:w-[250px] 2xl:-w-[303px] flex items-center justify-start font-semibold">
				<img
					className="inline-block w-10 h-10 mr-2 rounded-full "
					src={picture}
					alt={`Foto de perfil de ${name}`}
				/>
				{name}
			</div>
			<div className="flex items-center w-[165px]">{area}</div>
			<div className="flex items-center xl:w-[230px] 2xl:w-[263px] truncate">{email}</div>
			<div className="xl:w-[110px] 2xl:w-[178px] flex items-center uppercase text-xs">
				<span
					className={` p-1 rounded-sm ${isActive
						? 'text-[#4CAF50] bg-[#E8F5E9]'
						: 'text-[#EB5757] bg-[#FFE1E0]'}`}
				>
					{isActive ? 'Activo' : 'Inactivo'}
				</span>
			</div>
			<div className="w-[118px] flex items-center space-x-5 pr-5">
				<Link href={`/users/${name}?edit=true`}>
					<a title="Editar información">
						<img aria-hidden src="/assets/svgs/edit.svg" />
					</a>
				</Link>

				<button title="Eliminar">
					<img aria-hidden src="/assets/svgs/delete.svg" />
				</button>
				<Link href={`/users/${name}`}>
					<a title="Ver perfil">
						<img aria-hidden src="/assets/svgs/edit.svg" />
					</a>
				</Link>
			</div>
		</div>
	);
};

export default UserRow;
