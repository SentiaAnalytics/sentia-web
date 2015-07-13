'use strict';
import Pikaday from 'pikaday';

export default React.createClass({

  componentDidMount () {
    let element = this.getDOMNode();
    let {minDate, maxDate, dateStore} = this.props;
    this.picker = new Pikaday({
      field: element,
      minDate: minDate? moment(minDate).toDate(): null,
      maxDate: maxDate? moment(maxDate).toDate(): null,
      onSelect: function () {
        dateStore.set(this.getMoment());
      }
    });

    this.observable = dateStore
      .subscribe(() => this.forceUpdate());
  },

  componentWillUnmount () {
    this.observable.dispose();
  },

  render: function() {
    let date = this.props.dateStore.getValue();
    let classes = this.props.classes + " btn btn-primary"
    return (
        <input type="text" id={this.props.id} className={classes} defaultValue={date.format('YYYY-MM-DD')}/>
    );
  }
});
