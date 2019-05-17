import { plugin_slug } from "./data-plugin";

const icons = {
	edit: (
		/* https://material.io/tools/icons/?icon=edit */
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className="material-icon-edit"
		>
			<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	),
	remove: (
		/* https://material.io/tools/icons/?icon=remove_circle */
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			className="material-icon-remove_circle"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
		</svg>
	),
	block: (
		<svg width="100%" height="100%" viewBox="0 0 24 24">
			<polygon
				points="10,2 22,2 22,14 10,14"
				className={`${plugin_slug}-icon-back-y`}
			/>
			<polygon
				points="10,14 22,14 16,20 4,20"
				className={`${plugin_slug}-icon-back-z`}
			/>
			<polygon
				points="10,2 10,14 4,20 4,8"
				className={`${plugin_slug}-icon-back-x`}
			/>
			<polygon
				points="4,8 16,8 16,20 4,20"
				className={`${plugin_slug}-icon-front-y`}
			/>
			<polygon
				points="10,2 22,2 16,8 4,8"
				className={`${plugin_slug}-icon-front-z`}
			/>
			<polygon
				points="22,2 22,14 16,20 16,8"
				className={`${plugin_slug}-icon-front-x`}
			/>
		</svg>
	)
};

export default icons;
