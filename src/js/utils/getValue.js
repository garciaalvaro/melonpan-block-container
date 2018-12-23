const { isUndefined } = lodash;

const getValue = (name, settings, attributes) => {
	return !isUndefined(settings[name]) ? attributes[name] : undefined;
};

export default getValue;
