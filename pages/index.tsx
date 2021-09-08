import { Fragment, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from 'components/Sidebar/Sidebar';
import Searchbar from 'components/Searchbar/Searchbar';

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
				console.log(json.results[0]);
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
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
