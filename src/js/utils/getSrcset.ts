import l from "./log";

interface Img {
	source_url: string;
	width: number;
	[key: string]: any;
}
interface Sizes {
	[key: string]: Img;
}

const { toArray, mapValues, sortBy, flow } = lodash;

const getSrcset = (sizes: Sizes): string => {
	return flow([
		(sizes: Sizes) =>
			mapValues(sizes, (value: any, key: string) => ({
				...value,
				size: key
			})),
		toArray,
		(sizes: Img[]) => sortBy(sizes, "width"),
		(sizes: Img[]) =>
			sizes.map(
				({ source_url, width }: Img): string => `${source_url} ${width}w`
			),
		(sizes: Img[]) => sizes.join(", ")
	])(sizes);
};

export default getSrcset;
