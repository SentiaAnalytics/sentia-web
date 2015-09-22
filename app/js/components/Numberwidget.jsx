'use strict';
import formatNumber from '../util/formatNumber';
export default React.createClass({
  render: function() {
    const {id, value, suffix, title, className, color} = this.props;
    const articleClass = "text-center " + className;
    return (
      <article className={articleClass}>
        <div className="gutter-top gutter-bottom">
          <p className="h2 text-gray" id={id}>{formatNumber(value || 0)}<small>{suffix}</small></p>
        </div>
        <div className="bg-gray-lighter">
          <h4 className="uppercase gutter-top gutter-bottom" style={{color: color}}>{title}</h4>
        </div>

      </article>
    );
  }

});
