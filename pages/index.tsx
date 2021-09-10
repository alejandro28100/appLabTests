import { Fragment, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Sidebar from 'components/Sidebar/Sidebar';
import Searchbar from 'components/Searchbar/Searchbar';
import UsersTable from 'components/UsersTable/UsersTable';

import { fakeAdminUser } from 'utils/index';

const Home: NextPage = () => {
	const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);

	function handleToggleSidebar() {
		setIsSidebarOpen((prev) => !prev);
	}

	return (
		<Fragment>
			<Head>
				<title>GLI App | Cursos y Certificaciones</title>
				<meta name="description" content="Front-End technical test for AppLab" />
			</Head>
			<div className="flex ">
				<Sidebar isOpen={isSidebarOpen} handleToggleSidebar={handleToggleSidebar} />
				<div className="w-full flex flex-col">
					<Searchbar handleToggleSidebar={handleToggleSidebar} user={fakeAdminUser} loading={false} />
					<nav className="pt-8 pl-8">
						<ol className="flex">
							<li
								after-content=">"
								className="after:text-secondary after:mx-2 after:content-[attr(after-content)] after:inline-block"
							>
								Inicio
							</li>
							<li className="text-secondary">Administradores</li>
						</ol>
					</nav>
					<main className="px-8 pb-8">
						<h1 className="font-semibold text-xl">Administradores de la consola</h1>
						<UsersTable />
					</main>
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
