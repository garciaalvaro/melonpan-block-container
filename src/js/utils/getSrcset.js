import l from "./log";

const { toArray, sortBy } = lodash;

const getSrcset = sizes => {
	sizes = toArray(sizes);
	sizes = sortBy(sizes, "width");
	sizes = sizes.map(({ url, width }) => `${url} ${width}w`);
	sizes = sizes.join(", ");

	return sizes;
};

export default getSrcset;
