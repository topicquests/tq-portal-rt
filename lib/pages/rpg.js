import {
  Container,
  List,
  Tab,
} from 'semantic-ui-react';
import Layout from '../components/layout';
import ListItem from '../components/list-item';
import withAuth from '../components/auth';

const Quest = ({href, children}) => (
  <ListItem href={href} src='/static/images/game/quest_sm.png'>
    {children}
  </ListItem>
);

const Quests = () => (
  <Tab.Pane attached={false}>
    <h1>Quest Central</h1>
    <List>
      <Quest href='/quest/421a4354-b075-4213-a5dd-50a6043dc41a'>
        How are Quests Created?
      </Quest>
    </List>
  </Tab.Pane>
);

const Guild = ({href, children}) => (
  <ListItem href={href} src='/static/images/game/guild_sm.png'>
    {children}
  </ListItem>
);


const Guilds = () => (
  <Tab.Pane attached={false}>
    <h1>Guild Central</h1>
    <List>
      <Guild href='/guild/22d6567e-08d7-4358-a896-b2a87d702592'>
        A simple guild
      </Guild>
    </List>
  </Tab.Pane>
);

const panes = [
  {menuItem: 'Quests', render: Quests},
  {menuItem: 'Guilds', render: Guilds},
];

const RPGPage = (props) => (
  <Layout {...props}>
    <Container text>
      <Tab menu={{pointing: true}} panes={panes} />
    </Container>
  </Layout>
);

export default withAuth(RPGPage);
