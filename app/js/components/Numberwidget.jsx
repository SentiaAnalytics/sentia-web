'use strict';

export default React.createClass({
  render: function() {
    const {id, value, suffix, title, className} = this.props;
    const articleClass = "text-center " + className;
    return (
      <article className={articleClass}>
        <div className="gutter-top gutter-bottom">
          <p className="h2 text-gray" id={id}>{value || 0}<small>{suffix}</small></p>
        </div>
        <div className="bg-gray-lighter">
          <h1 className="small uppercase text-primary gutter-top gutter-bottom">{title}</h1>
        </div>

      </article>
    );
  }

});
