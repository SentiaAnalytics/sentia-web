import sessionContainer from '../containers/sessionContainer';
import Gravatar from 'react-gravatar';
import {Link} from 'react-router';

export default React.createClass({
  getInitialState () {
    return {user: {}};
  },

  componentDidMount () {
    this.disposable = sessionContainer
      .observable
      .filter(x => x)
      .onValue(({user}) => this.setState({user}));
  },

  componentWillUnmount () {
    this.disposable();
  },

  render () {
    const {storeId} = this.props;
    const {user} = this.state;

    return (
      <div className="sidebar">
        <div className="media sidebar-header hidden-xs">
          <div className="media-left">
            <div className="sidebar-header-img media-object">
              *<Gravatar email={user.email} size="50"/>
              <div className="sidebar-header-img-shadow"></div>
            </div>
          </div>
          <div className="media-body">
            <div className="">{user.firstname} {user.lastname}</div>
            <div className="">{user.email}</div>
          </div>
        </div>
        <Link className="sidebar-link" activeClassName="active" to={`/stores/${storeId}`}>
          <i className="glyphicon glyphicon-stats"></i> <span className="hidden-xs"> Dashboard</span>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to={`/stores/${storeId}/compare`}>
          <i className="glyphicon glyphicon-road"></i> <span className="hidden-xs"> Compare</span>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to={`/stores/${storeId}/floors`}>
          <i className="glyphicon glyphicon-record"></i> <span className="hidden-xs"> Floorplans</span>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to={`/stores/${storeId}/cameras`}>
          <i className="glyphicon glyphicon-camera"></i> <span className="hidden-xs"> Cameras</span>
        </Link>
      </div>
    );
  }
});
