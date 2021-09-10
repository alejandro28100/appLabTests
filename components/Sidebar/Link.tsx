import React, { FC } from 'react';
import Link from 'next/link';

interface SidebarLinkProps {
	href?: string;
	/** URL of an svg file */
	logo: string;
	/** Whether the link is active */
	active?: boolean;
	/** Text content */
	label: string;
	/** 
	 * Number that represents the notification user has on a given section
	 * it will be displayed as a small badge 
	 * */
	notificationNum?: number;
}

const SidebarLink: FC<SidebarLinkProps> = ({ href, label, logo, active, notificationNum }) => (
	<li
		className={`w-[256px] h-[49px] pl-12 hover:bg-terciary ${active && 'bg-terciary'}
		border-t-[1px] boder-b-[1px] border-terciary`}
	>
		<Link href={href as string}>
			<a className="inline-block w-full h-full py-3">
				<img alt="" className="inline-block" src={logo} />
				<span className="ml-2 text-sm">{label}</span>
				{(notificationNum as number) > 0 && (
					<span className="bg-[#E8F5E9] text-xs text-[#4CAF50] p-1 font-medium h-5 rounded-sm ml-9">
						{notificationNum}
					</span>
				)}
			</a>
		</Link>
	</li>
);
SidebarLink.defaultProps = {
	active: false,
	notificationNum: 0
};
export default SidebarLink;
