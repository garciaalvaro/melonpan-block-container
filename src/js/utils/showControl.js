const { isUndefined } = lodash;

const showControl = (name, settings) => {
	return (
		!isUndefined(settings[name]) && settings[name].show_control !== false
	);
};

export default showControl;
