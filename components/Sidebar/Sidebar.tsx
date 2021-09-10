import React, { FC, Fragment } from 'react';
import Image from 'next/image';
import Link from './Link';

interface SidebarProps {
	isOpen: boolean;
	handleToggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, handleToggleSidebar }) => {
	return (
		<Fragment>
			<div className={`fixed bg-primary/80 inset-0 z-10 ${!isOpen && 'hidden'}`} onClick={handleToggleSidebar} />
			<div
				className={`absolute z-20 overflow-y-auto -translate-x-full ${isOpen && 'translate-x-0'} 
				lg:translate-x-0 lg:static w-[257px] flex-shrink-0 flex-col border-r-[1px] border-terciary bg-white transition duration-300 ease-in`}
			>
				<header className="flex justify-center align-center py-[22px]">
					<Image src="/assets/svgs/logo.svg" width={72} height={59} />
				</header>
				<nav className="flex-1 pb-80">
					<ul className="flex flex-col">
						<Link label="Administradores" href="/" logo="/assets/svgs/person.svg" />
						<Link label="Catálogos" href="/" logo="/assets/svgs/catalogue.svg" />
						<Link label="Líderes" href="/" logo="/assets/svgs/peopleGroup.svg" />
						<Link label="Usuarios" href="/" logo="/assets/svgs/bag.svg" />
						<Link label="Mi empresa" href="/" logo="/assets/svgs/peopleGroup.svg" />
						<Link label="Cursos" href="/" logo="/assets/svgs/apple.svg" />
						<Link label="Recompensas" href="/" logo="/assets/svgs/bag.svg" />
						<Link label="Eventos" href="/" logo="/assets/svgs/calendar.svg" />
						<Link label="Notificaciones" href="/" logo="/assets/svgs/warning.svg" notificationNum={2} />
						<Link label="Reportes" href="/" logo="/assets/svgs/graph.svg" />
					</ul>
				</nav>
				<footer className="text-center text-xs m-3 mb-6">
					<div className="text-left flex justify-around bg-terciary/60 p-[10px] rounded">
						<div className="text-sm">
							¿Necesitas Ayuda? <br />
							<a className="underline" href="/">
								Ir a Sección de ayuda
							</a>
						</div>
						<img src="/assets/svgs/external-link.svg" />
					</div>
					<hr className="h-px my-4 text-terciary" />
					© Copyright GLI 2021
				</footer>
			</div>
		</Fragment>
	);
};

export default Sidebar;
