'use strict';

export default React.createClass({
  render: function() {
    return (
      <article className="container-fluid text-center">
        <h1 className="small uppercase text-primary">{this.props.title}</h1>
        <p className="h1" id={this.props.id}>{this.props.value || 0}</p>
      </article>
    );
  }

});
