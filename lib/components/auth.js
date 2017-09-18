import {Component} from 'react';
import getDebug from 'debug';
const debug = getDebug('tq-portal-rt:auth');

export default function withAuth(WrappedComponent, selectData) {
  return class Auth extends Component {
    constructor(props) {
      debug('new Auth()');
      super(props);
      const user = props.user;
      this.state = {user};
    }

    static async getInitialProps({res, err, query}) {
      debug('Auth#getInitialProps()');
      const statusCode = res ? res.statusCode : (err ? err.statusCode : null);
      if (res) {
        const {user} = res;
        if (!user && !process.browser) {
          debug('=> user', user);
          return {query, statusCode, user: false};
        }
        return {query, statusCode, user};
      }
      return {query, statusCode};
    }

    componentDidMount() {
      debug('Auth#componentDidMount()', this.props);
      if (this.props.user) {
        debug('Auth#componentDidMount() serializing user');
        sessionStorage['tq-portal-rt:user'] = JSON.stringify(this.props.user);
        return;
      }
      if (this.props.user === false) {
        debug('Auth#componentDidMount() purging user');
        sessionStorage['tq-portal-rt:user'] = null;
        this.setState({user: null});
        return;
      }
      debug('Auth#componentDidMount() deserializing user');
      const user = JSON.parse(sessionStorage['tq-portal-rt:user'] || '{}');
      this.setState({user});
    }

    render() {
      debug('Auth#render()');
      return <WrappedComponent user={this.state.user} {...this.props} />;
    }
  };
}
