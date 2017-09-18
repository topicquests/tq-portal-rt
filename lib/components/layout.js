import Head from 'next/head';
import MainMenu from './main-menu';
import FatFooter from './fat-footer';

const Layout = ({url: {pathname}, children, title = 'TopicQuests', user}) => (
  <div className='tq'>
    <Head>
      <title>{title}</title>
    </Head>
    <div>
      {children}
    </div>
    <MainMenu active={pathname} user={user} />
    <FatFooter />
    <style jsx>{`
      div.tq > div {
        margin-top: 4em;
      }
    `}</style>
  </div>
);
export default Layout;
