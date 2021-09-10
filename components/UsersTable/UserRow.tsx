import { FC, Fragment, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Dialog } from '@headlessui/react';

interface UserRowProps {
	id: string;
	picture: string;
	name: string;
	area: string;
	email: string;
	isActive: boolean;
	deleteUser: (id: string) => void;
}

const UserRow: FC<UserRowProps> = ({ picture, area, name, email, isActive, deleteUser, id }) => {
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	const cancelButtonRef = useRef<HTMLButtonElement>(null);

	function handleToggleModal() {
		setIsModalOpen((prev) => !prev);
	}

	function handleDeleteUser() {
		handleToggleModal();
		deleteUser(id);
	}

	return (
		<Fragment>
			<div className="flex flex-shrink-0 items-center w-[996px] lg:w-auto justify-start h-[72px] hover:bg-terciary text-sm border-t-[1px] border-b-[1px] border-terciary">
				<input className="w-[60px] text-center flex-shrink-0" aria-disabled type="checkbox" />
				<p className="flex-shrink-0 w-[250px] 2xl:-w-[303px] flex items-center justify-start font-semibold">
					<Image className="inline-block w-10 h-10 mr-2 rounded-full " src={picture} alt={name} />
					{name}
				</p>
				<p className="flex-shrink-0 w-[165px]">{area}</p>
				<div className="flex-shrink-0 w-[230px] 2xl:w-[263px] truncate">{email}</div>
				<p className="flex-shrink-0 w-[110px] 2xl:w-[178px] flex items-center uppercase text-xs">
					<span
						className={` p-1 rounded ${isActive
							? 'text-[#4CAF50] bg-[#E8F5E9]'
							: 'text-[#EB5757] bg-[#FFE1E0]'}`}
					>
						{isActive ? 'Activo' : 'Inactivo'}
					</span>
				</p>
				<div className="flex-shrink-0 w-[118px] flex items-center space-x-5 pr-5">
					<Link href={`/users/${name}?edit=true`}>
						<a title="Editar información">
							<Image alt="" aria-hidden src="/assets/svgs/edit.svg" />
						</a>
					</Link>
					<button title="Eliminar" onClick={handleToggleModal}>
						<Image alt="" aria-hidden src="/assets/svgs/delete.svg" />
					</button>
					<Link href={`/users/${name}`}>
						<a title="Ver perfil">
							<Image alt="" aria-hidden src="/assets/svgs/inspect.svg" />
						</a>
					</Link>
				</div>
			</div>
			<Dialog
				initialFocus={cancelButtonRef}
				open={isModalOpen}
				onClose={handleToggleModal}
				className="fixed z-10 inset-0 overflow-y-auto"
			>
				<div className="flex items-center justify-center min-h-screen dura">
					<Dialog.Overlay className="fixed inset-0 bg-primary/80" />

					<div className="relative bg-white rounded max-w-sm mx-auto">
						<button
							className="absolute -top-3 right-0 -translate-y-full"
							title="Cerrar menú"
							onClick={handleToggleModal}
						>
							<Image alt="" aria-hidden src="/assets/svgs/x-circle.svg" />
						</button>
						<div className="px-4 py-5 relative">
							<Dialog.Title className="text-secondary text-base font-semibold leading-5">
								Eliminar administrador
							</Dialog.Title>
							<hr className="h-px w-full text-terciary mt-2 mb-6" />
							<Dialog.Description className="text-sm leading-[22px]">
								¿Estás seguro de eliminar a este administrador?
							</Dialog.Description>
							<article className="mt-4 flex items-center space-x-2">
								<aside className="w-10 h-10 rounded-full">
									<Image
										className="w-full h-full object-cover rounded-full"
										src={picture}
										alt={name}
									/>
								</aside>
								<p className="">
									<span className="font-semibold text-sm ">{name}</span>
									<br />
									<span className="font-normal text-xs leading-5">{email}</span>
								</p>
							</article>
						</div>

						<div className="mt-14 py-6 flex justify-center space-x-4 items-center bg-terciary/30">
							<button
								className="btn secondary outlined"
								ref={cancelButtonRef}
								onClick={handleToggleModal}
							>
								Cancelar
							</button>
							<button className="btn secondary" onClick={handleDeleteUser}>
								Si, eliminar
							</button>
						</div>
					</div>
				</div>
			</Dialog>
		</Fragment>
	);
};

export default UserRow;
