'use strict';
import Pikaday from 'pikaday';

export default React.createClass({

  componentDidMount () {
    let element = this.getDOMNode();
    let dateStore = this.props.dateStore
    this.picker = new Pikaday({
      field: element,
      onSelect: function () {
        console.log('select');
        console.log(this.getMoment());
        dateStore.update.onNext(this.getMoment());
      }
    })

    this.observable = dateStore
      .store
      .subscribe(() => this.forceUpdate());
  },

  componentWillUnmount () {
    this.observable.dispose();
  },

  render: function() {
    let date = this.props.dateStore.store.getValue();
    return (
        <button className="btn btn-primary">{date.format('YYYY-MM-DD')}</button>
    );
  }
});
