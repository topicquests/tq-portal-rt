import {Link} from '../routes';
import {
  List,
  Image,
} from 'semantic-ui-react';

const ListItem = ({src, href, children}) => (
  <List.Item>
    <Image src={src} />
    <List.Content>
      <Link route={href} prefetch>
        <List.Header as='a' href={href}>
          {children}
        </List.Header>
      </Link>
    </List.Content>
  </List.Item>
);

export default ListItem;
