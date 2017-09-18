import {Container, Segment} from 'semantic-ui-react';
import Layout from '../components/layout';
import withAuth from '../components/auth';

const ContactPage = (props) => (
  <Layout {...props}>
    <Container text>
      <Segment>
        <h1>Contact</h1>
      </Segment>
    </Container>
  </Layout>
);

export default withAuth(ContactPage);
