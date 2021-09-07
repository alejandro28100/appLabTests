import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>App Lab Test</title>
				<meta name="description" content="Front-End technical test at AppLab" />
			</Head>

			<main>
				<h1>Hello World</h1>
			</main>
		</div>
	);
};

export default Home;
