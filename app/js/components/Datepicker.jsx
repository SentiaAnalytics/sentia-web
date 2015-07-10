'use strict';
import Pikaday from 'pikaday';

export default React.createClass({

  componentDidMount () {
    let element = this.getDOMNode();
    let dateStore = this.props.dateStore
    this.picker = new Pikaday({
      field: element,
      onSelect: function () {
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
    let classes = this.props.classes + " btn btn-primary"
    return (
        <input type="text" id={this.props.id} className={classes} defaultValue={date.format('YYYY-MM-DD')}/>
    );
  }
});
