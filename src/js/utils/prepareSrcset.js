import l from "./log";

const { map, toArray, sortBy } = lodash;

const prepareSrcset = sizes => {
	sizes = map(sizes, (value, key) => ({ ...value, size: key }));
	sizes = sortBy(sizes, "width");
	sizes = toArray(sizes);
	sizes = map(sizes, ({ url, width }) => `${url} ${width}w`);
	sizes = sizes.join(", ");

	return sizes;
};

export default prepareSrcset;
