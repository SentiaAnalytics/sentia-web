'use strict';

export default React.createClass({
  componentDidMount: function () {
    document.title = 'Sentia Analytics - Dashboard';
    dispatecher.dispatch({
      actionType: 'FETCH_STORE',
      storeId: '123'
    });
  },
  render: function () {
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          <article className="paper col-sm-6">
            <h1>revenue</h1>
            <p>1.323.923</p>
          </article>
        </div>
      </div>
    );
  }
});
