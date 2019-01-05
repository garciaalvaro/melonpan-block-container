const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;
const Span = ({ children, ...rest }) => <span {...rest}>{children}</span>;
const Img = props => <img {...props} />;

export { Div, Span, Img };
