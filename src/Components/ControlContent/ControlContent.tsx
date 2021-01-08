import React from "react";
import { compact, isUndefined } from "lodash";
import { __ } from "@wordpress/i18n";
import { Component, Fragment } from "@wordpress/element";
import { withState } from "@wordpress/compose";
import {
	RangeControl,
	BaseControl,
	Toolbar,
	PanelBody,
	ColorIndicator
} from "@wordpress/components";
import * as blockEditor from "@wordpress/block-editor";
import * as editor from "@wordpress/editor";

import { Span } from "utils/Components";
import { addPrefix } from "utils/tools";

interface AlignControl {
	name: string;
	title: string;
	icon: string;
	isActive: boolean;
	onClick: Function;
}

interface WithStateProps {
	align_controls: AlignControl[];
}

interface Props extends EditProps, WithStateProps {
	setState: Function;
}

const { ColorPalette } = blockEditor || editor;

export const Content: React.ComponentType<EditProps> = withState<
	WithStateProps
>({
	align_controls: []
})(
	class extends Component<Props> {
		componentDidMount() {
			const { setAttributes, values, setState, settings } = this.props;
			const { content_align } = settings;

			if (!content_align) {
				return;
			}

			const align_controls = content_align.options.map((control: string) => {
				switch (control) {
					case "left":
						return {
							name: "left",
							title: "Left",
							icon: "align-left",
							isActive: values.content_align === "left",
							onClick: () => setAttributes({ content_align: "left" })
						};
						break;

					case "center":
						return {
							name: "center",
							title: "center",
							icon: "align-center",
							isActive: values.content_align === "center",
							onClick: () => setAttributes({ content_align: "center" })
						};
						break;

					case "right":
						return {
							name: "right",
							title: "right",
							icon: "align-right",
							isActive: values.content_align === "right",
							onClick: () => setAttributes({ content_align: "right" })
						};
						break;

					case "full":
						return {
							name: "full",
							title: "full",
							icon: "align-full-width",
							isActive: values.content_align === "full",
							onClick: () => setAttributes({ content_align: "full" })
						};
						break;

					default:
						return null;
						break;
				}
			});

			setState({ align_controls: compact(align_controls) as AlignControl[] });
		}

		render() {
			const { setAttributes, values, settings } = this.props;
			const { content_maxwidth, content_color, content_align } = settings;
			const align_controls = this.props.align_controls.map(control => ({
				...control,
				isActive: values.content_align === control.name
			}));

			return (
				<PanelBody
					title={__("Content")}
					className={addPrefix("panel_body")}
					initialOpen={false}
				>
					{content_align && content_align.show_control && (
						<BaseControl
							id={addPrefix("content_align")}
							className={addPrefix([
								"content_align",
								"control",
								"control-toolbar",
								`selected-${values.content_align}`
							])}
							label={__("Align")}
							help={__(
								"Choose an option to align the content inside the container."
							)}
						>
							{/*
							// @ts-ignore TODO */}
							<Toolbar controls={align_controls} />
						</BaseControl>
					)}

					{content_maxwidth &&
						!isUndefined(values.content_maxwidth) &&
						content_maxwidth.show_control && (
							<RangeControl
								label={__("Max width")}
								className={addPrefix([
									"content_maxwidth",
									"control",
									"control-range"
								])}
								value={values.content_maxwidth}
								step={content_maxwidth.step}
								min={content_maxwidth.min}
								max={content_maxwidth.max}
								onChange={(value: number) =>
									setAttributes({ content_maxwidth: value })
								}
							/>
						)}

					{content_color &&
						"content_color" in values &&
						content_color.show_control && (
							<BaseControl
								id={addPrefix("content_color")}
								label={
									<Fragment>
										<Span>{__("Text color")}</Span>
										<ColorIndicator
											colorValue={
												values["content_color" as keyof typeof values]
											}
										/>
									</Fragment>
								}
								className={addPrefix([
									"content_color",
									"control",
									"control-colorpalette"
								])}
							>
								<ColorPalette
									colors={content_color.colors}
									// @ts-ignore. Value should accept string.
									value={values["content_color" as keyof typeof values]}
									// @ts-ignore. Value should be string.
									onChange={(value: string) =>
										setAttributes({
											content_color:
												isUndefined(value) &&
												settings.content_color &&
												settings.content_color.default !== ""
													? ""
													: value
										})
									}
								/>
							</BaseControl>
						)}
				</PanelBody>
			);
		}
	}
);
