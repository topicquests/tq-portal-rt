import {
  Button,
  Container,
  Divider,
  Form,
  Message,
  Segment,
} from 'semantic-ui-react';
import Layout from '../components/layout';

const LoginPage = ({email, password, errors, ...props}) => (
  <Layout {...props}>
    <Container text>
      <Segment>
        <h1>Login</h1>
        <Form action='/login' method='POST' error={!!Object.keys(errors).length}>
          <Form.Field>
            <Form.Input
              label='Email'
              name='email'
              type='email'
              defaultValue={email}
              error={!!errors.email}
            />
            <Message error content={errors.email} />
          </Form.Field>
          <Form.Field>
            <Form.Input
              label='Password'
              name='password'
              type='password'
              defaultValue={password}
              error={!!errors.password}
            />
            <Message error content={errors.password} />
          </Form.Field>
          <Message error header={errors.header} content={errors.content} />
          <Button type='submit' positive>Login</Button>
        </Form>
        <Divider />
        Need an account? <a href='/signup'>Signup</a>
      </Segment>
    </Container>
  </Layout>
);

LoginPage.getInitialProps = async ({res = {}}) => {
  const {fields = {}, errors = {}} = res;
  return {errors, ...fields};
};

export default LoginPage;
