import React, { ChangeEvent, FormEvent, Fragment, useRef, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import Sidebar from 'components/Sidebar/Sidebar';
import Searchbar from 'components/Searchbar/Searchbar';
import InputWithLabel from 'components/InputWithLabel';
import SelectWithLabel from 'components/SelectWithLabel';
import FileInput from 'components/FileInput';

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

									<FileInput
										containerClassName="w-[196px] h-[202px]"
										imagePreview={image}
										multiple={false}
										onChange={handleImageInputChange}
									/>

									<InputWithLabel
										type="text"
										placeholder="Nombre (s)"
										value={name}
										onChange={(e) => handleInputChange(e, 'name')}
										id="name"
										label="Nombre (s)"
										required
										containerClassName="w-[308px] my-[30px]"
									/>

									<InputWithLabel
										label="Apellidos"
										value={lastName}
										onChange={(e) => handleInputChange(e, 'lastName')}
										containerClassName="w-[308px] my-[30px]"
										id="lastName"
										required
										placeholder="Apellidos"
									/>

									<InputWithLabel
										label="Correo Electrónico"
										id="email"
										containerClassName="w-[308px] my-[30px]"
										required
										value={email}
										onChange={(e) => handleInputChange(e, 'email')}
										type="text"
										placeholder="Correo electrónico"
									/>

									<SelectWithLabel
										containerClassName="w-[308px] my-[30px]"
										id="job-area"
										label="Área"
										value={area}
										onChange={(e) => handleSelectChange(e, 'area')}
									>
										<option value="">Recursos Humanos</option>
									</SelectWithLabel>

									<SelectWithLabel
										containerClassName="w-[308px] my-[30px]"
										id="user-status"
										label="Estatus"
										value={String(status)}
										onChange={(e) => handleSelectChange(e, 'status')}
									>
										<option value="true">Activo</option>
										<option value="false">Inactivo</option>
									</SelectWithLabel>

									<hr className="h-px w-full text-terciary my-10" />
									<div className="space-x-4">
										<button type="reset" className="self-center btn secondary outlined">
											Cancelar
										</button>
										<button type="submit" className="self-center btn secondary">
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
											<a className="btn secondary">Regresar a mis administradores</a>
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
