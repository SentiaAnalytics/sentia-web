export default React.createClass({

  render () {
    return (
      <div className="full-height">
        {this.props.children}
      </div>
    );
  }
});
