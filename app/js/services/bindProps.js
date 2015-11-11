const addProps = R.curry((props, element) => React.cloneElement(element, props));

export default R.curry((props, children) => React.Children.map(children, addProps(props)));
