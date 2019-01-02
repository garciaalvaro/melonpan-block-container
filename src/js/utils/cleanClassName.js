const { compact } = lodash;

const cleanClassName = className => {
	className = className.replace(/( )+/g, " ");
	className = className.split(" ");
	className = className.map(class_name =>
		class_name.match(/^mbc-/) !== null ? null : class_name
	);
	className = compact(className);
	className = className.join(" ");

	return className;
};

export default cleanClassName;
