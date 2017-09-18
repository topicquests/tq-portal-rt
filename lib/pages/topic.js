import {Container, Image, List, Tab} from 'semantic-ui-react';
import Layout from '../components/layout';
import ListItem from '../components/list-item';
import withAuth from '../components/auth';

const TopicTab = () => (
  <Tab.Pane attached={false}>
    <h1>Topic</h1>
  </Tab.Pane>
);

const panes = [
  {menuItem: 'Topic', render: TopicTab},
];

const TopicPage = (props) => (
  <Layout {...props}>
    <Container text>
      <Tab menu={{pointing: true}} panes={panes} />
    </Container>
  </Layout>
);

export default withAuth(TopicPage);
