import React, { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Sidebar from 'components/Sidebar/Sidebar';
import Input from 'components/Input';
import Searchbar from 'components/Searchbar/Searchbar';
import { fakeAdminUser } from 'utils/index';

interface FormProps {
	image: string;
	name: string;
	lastName: string;
	email: string;
	area: string;
	status: boolean;
}

const initalValue = {
	image: '',
	name: '',
	lastName: '',
	email: '',
	area: 'Recursos Humanos',
	status: true
};
const AddUser: NextPage = (props) => {
	const [ form, setForm ] = useState<FormProps>(initalValue);
	const { image, name, lastName, email, area, status } = form;

	const [ isUserSaved, setIsUserSaved ] = useState(false);

	const imageInputRef = useRef<HTMLInputElement>(null);

	function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		/** Handle saving user data on the server */

		/** Show success message */
		setIsUserSaved(true);
	}
	function handleResetForm(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setForm(initalValue);
	}

	function handleImageInputChange(event: ChangeEvent<HTMLInputElement>) {
		let file = event.target.files && event.target.files.item(0);
		let reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file as Blob);
		}

		reader.onloadend = (e) => {
			setForm(
				(form) =>
					({
						...form,
						image: reader.result
					} as FormProps)
			);
		};
	}

	function handleInputChange(e: ChangeEvent<HTMLInputElement>, key: string) {
		const value = e.target.value;
		setForm(
			(form) =>
				({
					...form,
					[key]: value
				} as FormProps)
		);
	}

	function handleSelectChange(e: ChangeEvent<HTMLSelectElement>, key: string) {
		const value = e.target.value === 'true';
		setForm(
			(form) =>
				({
					...form,
					[key]: value
				} as FormProps)
		);
	}

	return (
		<Fragment>
			<Head>
				<title>GLI App | Cursos y Certificaciones</title>
				<meta name="description" content="Front-End technical test for AppLab" />
			</Head>
			<div className="flex">
				<Sidebar />
				<div className="w-full flex flex-col">
					<Searchbar user={fakeAdminUser} loading={false} />
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
						<h1 className="font-semibold text-xl">Agregar Administrador</h1>
						<section className="my-6">
							{!isUserSaved ? (
								<form onSubmit={handleSubmitForm} onReset={handleResetForm}>
									<p className="font-normal leading-6 text-sm my-3">
										Sube tu fotografía con un peso menor a 2MB
									</p>
									<div className="w-[196px] h-[202px] shadow relative flex flex-col justify-center rounded">
										<div className="h-[108px] flex-grow bg-terciary flex items-center justify-center">
											{form && image ? (
												<img
													className="w-full h-full object-cover rounded-t"
													src={image}
													alt=""
												/>
											) : (
												<img
													className="w-[52px] h-[52px] object-cover"
													aria-hidden
													src="/assets/svgs/upload_image.svg"
													alt=""
												/>
											)}
										</div>

										<div className="text-center">
											<p className="my-3 text-center font-normal text-[11px] leading-3">
												Arrastra tu archivo o
											</p>
											<button className="self-center text-center border-[1px] border-secondary mb-4 px-4 py-3 rounded-[4px] text-[13px] leading-[18px]">
												Selecciona
											</button>
										</div>

										<input
											ref={imageInputRef}
											className="absolute top-0 left-0 w-full h-full opacity-0"
											type="file"
											multiple={false}
											onChange={handleImageInputChange}
											id="image"
										/>
									</div>
									<div className="relative w-[308px] my-[30px] ">
										<label
											className="absolute mx-3 p-1 bg-white font-normal leading-3 text-xs -translate-y-1/2"
											htmlFor="name"
										>
											Nombre (s)
										</label>
										<input
											required
											value={name}
											onChange={(e) => handleInputChange(e, 'name')}
											className="rounded-lg py-4 px-3 border-terciary border-[1px] leading-4 font-normal text-base w-full"
											id="name"
											type="text"
											placeholder="Nombre (s)"
										/>
									</div>

									<div className="relative w-[308px] my-[30px] ">
										<label
											className="absolute mx-3 p-1 bg-white font-normal leading-3 text-xs -translate-y-1/2"
											htmlFor="lastName"
										>
											Apellidos
										</label>
										<input
											required
											value={lastName}
											onChange={(e) => handleInputChange(e, 'lastName')}
											className="rounded-lg py-4 px-3 border-terciary border-[1px] leading-4 font-normal text-base w-full"
											id="lastName"
											type="text"
											placeholder="Apellidos"
										/>
									</div>
									<div className="relative w-[308px] my-[30px] ">
										<label
											className="absolute mx-3 p-1 bg-white font-normal leading-3 text-xs -translate-y-1/2"
											htmlFor="email"
										>
											Correo Electrónico
										</label>
										<input
											required
											value={email}
											onChange={(e) => handleInputChange(e, 'email')}
											className="rounded-lg py-4 px-3 border-terciary border-[1px] leading-4 font-normal text-base w-full"
											id="email"
											type="text"
											placeholder="Correo electrónico"
										/>
									</div>

									<div className="relative w-[308px] my-[30px]">
										<label
											className="absolute mx-3 px-1 bg-white font-normal text-xs -translate-y-1/2"
											htmlFor="job-area"
										>
											Área
										</label>
										<select
											value={area}
											onChange={(e) => handleSelectChange(e, 'area')}
											id="job-area"
											className="py-5 px-3 border-[1px] border-terciary rounded-lg w-full"
										>
											<option value="">Recursos Humanos</option>
										</select>
									</div>
									<div className="relative w-[308px] my-[30px]">
										<label
											className="absolute mx-3 px-1 bg-white font-normal text-xs -translate-y-1/2"
											htmlFor="user-status"
										>
											Estatus
										</label>
										<select
											value={String(status)}
											onChange={(e) => handleSelectChange(e, 'status')}
											className="py-5 px-3 border-[1px] border-terciary rounded-lg w-full"
											id="user-status"
										>
											<option value="true">Activo</option>
											<option value="false">Inactivo</option>
										</select>
									</div>

									<hr className="h-px w-full text-terciary my-10" />
									<div className="space-x-4">
										<button
											type="reset"
											className="self-center text-center border-[1px] border-secondary mb-4 px-4 py-3 rounded-[4px] text-[13px] leading-[18px]"
										>
											Cancelar
										</button>
										<button
											type="submit"
											className="self-center text-center bg-secondary text-white mb-4 px-4 py-3 rounded-[4px] text-[13px] leading-[18px]"
										>
											Agregar administrador
										</button>
									</div>
								</form>
							) : (
								<Fragment>
									<div className="w-[52px] h-[52px] bg-[#6FCF97] rounded-full flex items-center justify-center">
										<img
											className="w-[16px] h-[11px] object-contain"
											aria-hidden
											src="/assets/svgs/tick.svg"
											alt=""
										/>
									</div>

									<h2 className="my-1 font-bold text-base ">Cambios guardados</h2>
									<p>Tu administrador se ha guardado con éxito.</p>

									<div className="mt-9 ">
										<Link href="/">
											<a className="bg-secondary text-white px-4 py-3 rounded-[4px] leading-[18px]">
												Regresar amis administradores
											</a>
										</Link>
									</div>
								</Fragment>
							)}
						</section>
					</main>
				</div>
			</div>
		</Fragment>
	);
};

export default AddUser;
