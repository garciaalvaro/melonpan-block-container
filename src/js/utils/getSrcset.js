import l from "./log";

const { toArray, mapValues, sortBy } = lodash;

const getSrcset = sizes => {
	sizes = mapValues(sizes, (value, key) => ({ ...value, size: key }));
	sizes = toArray(sizes);
	sizes = sortBy(sizes, "width");
	sizes = sizes.map(({ source_url, width }) => `${source_url} ${width}w`);
	sizes = sizes.join(", ");

	return sizes;
};

export default getSrcset;
