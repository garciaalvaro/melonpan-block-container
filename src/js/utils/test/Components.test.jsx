import l, { Div, Span, Img } from "utils";
import { shallow } from "enzyme";

describe("Components Div", function() {
	it("should render an empty div", function() {
		expect(shallow(<Div />).html()).toBe("<div></div>");
		expect(
			shallow(<Div id="a" classes={["a", "#b", 123]} data-a="b" />).html()
		).toBe(`<div data-a=\"b\" id=\"mbc-a\" class=\"mbc-a b\"></div>`);
	});

	it("should render an empty span", function() {
		expect(shallow(<Span />).html()).toBe("<span></span>");
		expect(
			shallow(<Span id="a" classes={["a", "#b", 123]} data-a="b" />).html()
		).toBe(`<span data-a=\"b\" id=\"mbc-a\" class=\"mbc-a b\"></span>`);
	});

	it("should render an img", function() {
		expect(shallow(<Img />).html()).toBe("<img/>");
		expect(
			shallow(<Img id="a" classes={["a", "#b", 123]} data-a="b" />).html()
		).toBe(`<img data-a=\"b\" id=\"mbc-a\" class=\"mbc-a b\"/>`);
	});
});
