import { Div, Span, Img } from "utils/Components";
import { shallow } from "enzyme";

describe("Components Div", function() {
	it("should render an empty div", function() {
		expect(shallow(<Div />).html()).toBe("<div></div>");
		expect(
			shallow(
				<Div aaa="b" data-b="b" id="a" className={["a", "!b", null]} />
			).html()
		).toBe(`<div id=\"mbc-a\" class=\"mbc-a b\" aaa=\"b\" data-b=\"b\"></div>`);
	});

	it("should render an empty span", function() {
		expect(shallow(<Span />).html()).toBe("<span></span>");
		expect(
			shallow(
				<Span aaa="b" id="a" className={["a", "!b", null]} data-b="b" />
			).html()
		).toBe(
			`<span id=\"mbc-a\" class=\"mbc-a b\" aaa=\"b\" data-b=\"b\"></span>`
		);
	});

	it("should render an img", function() {
		expect(shallow(<Img />).html()).toBe("<img/>");
		expect(
			shallow(
				<Img id="a" className={["a", "!b", null]} aaa="b" data-b="b" />
			).html()
		).toBe(`<img id=\"mbc-a\" class=\"mbc-a b\" aaa=\"b\" data-b=\"b\"/>`);
	});
});
