import { plugin_slug } from "./info-plugin";

const icons = {
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
