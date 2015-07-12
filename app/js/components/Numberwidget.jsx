'use strict';

export default React.createClass({
  render: function() {
    return (
      <article className="paper paper-widget-small container-fluid">
        <h1>{this.props.title}</h1>
        <p id={this.props.id}>{this.props.value}</p>
      </article>
    );
  }

});
