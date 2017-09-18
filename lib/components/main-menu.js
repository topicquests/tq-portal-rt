import {
  Button,
  Container,
  Dropdown,
  Form,
  Input,
  Menu,
} from 'semantic-ui-react';
import {Link} from '../routes';

const MenuItem = ({active, href, children}) => (
  <Link route={href} prefetch>
    <Menu.Item as='a' href={href} active={active === href}>
      {children}
    </Menu.Item>
  </Link>
);

const DropdownItem = ({active, href, children}) => (
  <Link route={href} prefetch>
    <Dropdown.Item as='a' href={href} active={active === href}>
      {children}
    </Dropdown.Item>
  </Link>
);

const MainMenu = ({active, user}) => (
  <Menu fixed='top' inverted>
    <Container>
      <MenuItem active={active} href='/index'>Home</MenuItem>
      <MenuItem active={active} href='/about'>About</MenuItem>
      <MenuItem active={active} href='/contact'>Contact</MenuItem>
      <Dropdown item text='Applications'>
        <Dropdown.Menu>
          <DropdownItem active={active} href="/rpg">Quests</DropdownItem>
          <DropdownItem active={active} href="/blog">Blog</DropdownItem>
          <DropdownItem active={active} href="/bookmark">Bookmark</DropdownItem>
          <DropdownItem active={active} href="/conversation">
            Conversation
          </DropdownItem>
          <DropdownItem active={active} href="/dbpedia">DbPedia</DropdownItem>
          <DropdownItem active={active} href="/geomap">GeoMap</DropdownItem>
          <DropdownItem active={active} href="/search">Search</DropdownItem>
          <DropdownItem active={active} href="/tag">Tags</DropdownItem>
          <DropdownItem active={active} href="/user">Gardeners</DropdownItem>
          <DropdownItem active={active} href="/research">Research</DropdownItem>
          <DropdownItem active={active} href="/wiki">Wiki</DropdownItem>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position='right'>
        <form role='search' action='/search' method='GET'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' name='q' />
          </Menu.Item>
        </form>
        <Dropdown item text='Account'>
          {
            user ? (
              <Dropdown.Menu>
                <DropdownItem active={active} href='/profile'>{user.name}</DropdownItem>
                <Dropdown.Item className={'formfix'}>
                  <Form action='/logout' method='POST'>
                    <Button type='submit' className='basic fluid link'>Logout</Button>
                  </Form>
                </Dropdown.Item>
              </Dropdown.Menu>
            ) : (
              <Dropdown.Menu>
                <DropdownItem active={active} href='/signup'>Signup</DropdownItem>
                <DropdownItem active={active} href='/login'>Login</DropdownItem>
              </Dropdown.Menu>
            )
          }
        </Dropdown>
      </Menu.Menu>
    </Container>
    <style jsx global>{`
      .ui.menu .ui.dropdown .menu>.item.formfix {
        padding: 0 !important;
      }
      .ui.dropdown .ui.button.basic {
        color: rgba(0,0,0,.87)!important;
      }
      .ui.dropdown .ui.button.basic:hover {
        background-color: rgba(0, 0, 0, 0.01) !important;
      }
      .ui.button.basic.link, .ui.button.basic.link:hover, .ui.button.basic.link:focus {
        box-shadow: 0 0 !important;
      }
    `}</style>
  </Menu>
);

export default MainMenu;
