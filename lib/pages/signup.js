import {
  Button,
  Container,
  Divider,
  Form,
  Segment,
} from 'semantic-ui-react';
import Layout from '../components/layout';

export default (props) => (
  <Layout {...props}>
    <Container text>
      <Segment>
        <h1>Signup</h1>
        <Form action='/signup' method='POST'>
          <Form.Field>
            <label>Full Name</label>
            <input name='name' />
          </Form.Field>
          <Form.Field>
            <label>Handle</label>
            <input name='handle' />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input name='email' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input name='Password' type='password' />
          </Form.Field>
          <Button type='submit' positive>Signup</Button>
        </Form>
        <Divider />
        Already have an account? <a href='/login'>Login</a>
      </Segment>
    </Container>
  </Layout>
);
