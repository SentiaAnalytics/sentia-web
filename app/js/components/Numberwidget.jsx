'use strict';

export default React.createClass({
  render: function() {
    const {id, value, suffix, title} = this.props;
    return (
      <article className="container-fluid text-center">
        <h1 className="small uppercase text-primary">{title}</h1>
        <p className="h1" id={id}>{value || 0}<small>{suffix}</small></p>
      </article>
    );
  }

});
