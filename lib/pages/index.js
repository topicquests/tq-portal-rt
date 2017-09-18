import {Container, Image, List, Tab} from 'semantic-ui-react';
import Layout from '../components/layout';
import ListItem from '../components/list-item';
import withAuth from '../components/auth';

const HelpItem = ({href, children}) => (
  <ListItem href={href} src='/static/images/publication_sm.png'>
    {children}
  </ListItem>
);

const HomeTab = () => (
  <Tab.Pane attached={false}>
    <h1>TopicQuests TopicHub Portal Prototype</h1>
    <Image src='/static/images/herebedragons.jpg' size='huge' />
  </Tab.Pane>
);

const ActivityTab = () => (
  <Tab.Pane attached={false}>
    <h1>Recent Activities</h1>
  </Tab.Pane>
);

const HelpTab = () => (
  <Tab.Pane attached={false}>
    <h1>Help Topics</h1>
    <List>
      <HelpItem href='/topic/054c613d-75bd-4058-99aa-680ee4d3fe6e'>
        How to Connect Topics
      </HelpItem>
      <HelpItem href='/topic/243d6a3e-6899-4a6a-863e-4b25ee1f19ca'>
        How to Setup a Bookmarklet
      </HelpItem>
      <HelpItem href='/topic/2fe1867c-fefd-4202-8d4b-6809cd1ad894'>
        How to Use a Bookmarklet
      </HelpItem>
      <HelpItem href='/topic/e15845d8-9b71-4f4f-98d5-965bb3799cd5'>
        Notes about Pivot Browsing
      </HelpItem>
      <HelpItem href='/topic/98db32c1-1fee-4824-bacb-0b5211cc1cff'>
        How to Transclude
      </HelpItem>
    </List>
  </Tab.Pane>
);

const panes = [
  {menuItem: 'Home', render: HomeTab},
  {menuItem: 'Activity', render: ActivityTab},
  {menuItem: 'Help', render: HelpTab},
];

const HomePage = (props) => (
  <Layout {...props}>
    <Container text>
      <Tab menu={{pointing: true}} panes={panes} />
    </Container>
  </Layout>
);

export default withAuth(HomePage);
