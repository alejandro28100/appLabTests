import { Fragment } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from 'components/Sidebar/Sidebar';

const Home: NextPage = () => {
	return (
		<Fragment>
			<Head>
				<title>App Lab Test</title>
				<meta name="description" content="Front-End technical test at AppLab" />
			</Head>
			<div className="flex">
				<Sidebar />
			</div>
		</Fragment>
	);
};

export default Home;
