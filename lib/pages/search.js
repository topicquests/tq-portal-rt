import {Container, Input, Segment} from 'semantic-ui-react';
import Layout from '../components/layout';
import withAuth from '../components/auth';

const SearchPage = ({query: {q}, ...props}) => (
  <Layout {...props}>
    <Container text>
      <form role='search' action='/search' method='GET'>
        <Input
          fluid
          icon='search'
          placeholder='Search...'
          defaultValue={q}
          name='q'
        />
      </form>
      <Segment>
        <h1>Search Results</h1>
      </Segment>
    </Container>
  </Layout>
);

export default withAuth(SearchPage);
