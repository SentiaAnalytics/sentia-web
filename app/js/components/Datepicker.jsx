'use strict';
import Pikaday from 'pikaday';

export default React.createClass({
  componentDidMount () {
    let element = this.getDOMNode();
    let {minDate, maxDate, dateStore} = this.props;
    let picker = new Pikaday({
      field: element,
      minDate: minDate? moment(minDate).toDate(): null,
      maxDate: maxDate? moment(maxDate).toDate(): null,
      position:'Automatic',
      onSelect: function () {
        dateStore.observer.onNext(this.getMoment());
      }
    });

    this.disposable = dateStore.observable
      .filter((date) => !date.isSame(picker.getMoment(), 'day'))
      .subscribe((date) => picker.setDate(date.format('YYYY-MM-DD')));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render: function() {
    let defaultDate =  moment().format('YYYY-MM-DD');
    let classes = this.props.classes + " btn btn-primary";
    return (
        <input type="text" style={{width: '100px'}} id={this.props.id} className={classes} defaultValue={defaultDate}/>
    );
  }
});
