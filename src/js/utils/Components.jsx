const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;
const Img = props => <img {...props} />;

export { Div, Img };
