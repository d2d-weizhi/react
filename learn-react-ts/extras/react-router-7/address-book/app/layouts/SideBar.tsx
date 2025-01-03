import { useEffect } from "react";
import { Form, Link, NavLink, Outlet, useNavigation, useSubmit } from "react-router";
import type {Route} from "../../.react-router/types/app/+types/root";
import {getContacts} from "../data";

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const contacts = await getContacts(q);
	return {contacts, q};
}

export default function SideBarLayout({loaderData}: Route.ComponentProps) {
	// @ts-ignore
	const {contacts, q} = loaderData;
	const navigation = useNavigation();
	const submit = useSubmit();
	const searching = navigation.location
		&& new URLSearchParams(navigation.location.search).get("q");
	
	useEffect(() => {
		const searchField = document.getElementById("q");
		if (searchField instanceof HTMLInputElement) {
			searchField.value = q || "";
		}
	}, [q]);
	
	return (
			<>
				<div id="sidebar">
					<h1>
						<Link to="about">React Router Contacts</Link>
					</h1>
					<div>
						<Form
							id="search-form"
							role="search"
							onChange={(event) => {
								const isFirstSearch = q === null;
								submit(event.currentTarget, {
									replace: !isFirstSearch,
								});
							}}
						>
							<input
									aria-label="Search contacts"
									className={searching ? "loading" : ""}
									defaultValue={q || ""}
									id="q"
									name="q"
									placeholder="Search"
									type="search"
							/>
							<div aria-hidden hidden={!searching} id="search-spinner"/>
						</Form>
						<Form method="post">
							<button type="submit">New</button>
						</Form>
					</div>
					<nav>
						{contacts.length ? (
								<ul>
									{contacts.map((contact: any) => (
											<li key={contact.id}>
												<NavLink
													className={({isActive, isPending}) =>
														isActive
															? "active"
															: isPending
																? "pending"
																: ""
													}
													to={`contacts/${contact.id}`}>
													{contact.first || contact.last ? (
															<>
																{contact.first} {contact.last}
															</>
													) : (
															<i>No Name</i>
													)}
													{contact.favourite ? (
															<span>★</span>
													) : null}
												</NavLink>
											</li>
									))}
								</ul>
						) : (
								<p>
									<i>No Contacts</i>
								</p>
						)}
					</nav>
				</div>
				<div
					id="detail"
					className={
						navigation.state === "loading" && !searching ? "loading" : ""
					}>
					<Outlet/>
				</div>
			</>
	);
}