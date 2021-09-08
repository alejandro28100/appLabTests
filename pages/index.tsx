import { Fragment, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from 'components/Sidebar/Sidebar';
import Searchbar from 'components/Searchbar/Searchbar';
import UsersTable from 'components/UsersTable/UsersTable';

const Home: NextPage = () => {
	// / Use type any because we do not know the user date interface
	const [ user, setUser ] = useState<any>();
	const [ loading, setLoading ] = useState(true);
	useEffect(() => {
		// Fetch fake user data
		(async function() {
			try {
				const result = await fetch('https://www.randomuser.me/api/?nat=es');
				const json = await result.json();
				setUser(json.results[0]);
			} catch (error) {
				console.error('Error getting the user');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<Fragment>
			<Head>
				<title>App Lab Test</title>
				<meta name="description" content="Front-End technical test at AppLab" />
			</Head>
			<div className="flex">
				<Sidebar />
				<div className="w-full flex flex-col">
					<Searchbar user={user} loading={loading} />
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
