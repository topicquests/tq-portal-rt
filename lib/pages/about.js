import {Container, Segment} from 'semantic-ui-react';
import Layout from '../components/layout';
import withAuth from '../components/auth';

const AboutPage = (props) => (
  <Layout {...props}>
    <Container text>
      <Segment>
        <h1>About</h1>
      </Segment>
    </Container>
  </Layout>
);

export default withAuth(AboutPage);
