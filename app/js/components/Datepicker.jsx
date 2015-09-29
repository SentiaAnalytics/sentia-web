'use strict';
import Pikaday from 'pikaday';

export default React.createClass({
  componentDidMount () {
    let element = this.getDOMNode();
    let {minDate, maxDate, container} = this.props;
    let picker = new Pikaday({
      field: element,
      minDate: minDate? moment(minDate).toDate(): null,
      maxDate: maxDate? moment(maxDate).toDate(): null,
      position:'Automatic',
      onSelect: function () {
        container.observer.onNext(this.getMoment());
      }
    });

    this.disposable = container.observable
      .filter((date) => !date.isSame(picker.getMoment(), 'day'))
      .tap(x => logger.log('DATE', x.toString()))
      .subscribe((date) => picker.setDate(date.format('YYYY-MM-DD')));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render: function() {
    let defaultDate =  moment().format('YYYY-MM-DD');
    let classes = this.props.className + " btn btn-primary";
    return (
        <input type="text" id={this.props.id} className={classes} defaultValue={defaultDate}/>
    );
  }
});
