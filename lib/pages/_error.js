import Error from 'next/error';
import Layout  from '../components/layout';
import withAuth from '../components/auth';

const ErrorPage = (props) => (
  <Layout {...props}>
    <Error statusCode={props.statusCode} />
  </Layout>
);

export default withAuth(ErrorPage);
