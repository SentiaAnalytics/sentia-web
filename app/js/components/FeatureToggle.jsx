'use strict';
import location from '../services/location';

export default React.createClass({
  render () {
    const {prop, value} = this.props;
    if (location.get(prop) === value) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
    return (<div></div>);
  }
})
