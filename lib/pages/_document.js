import Document, {Head, Main, NextScript} from 'next/document';
import flush from 'styled-jsx/server';

/**
 * MyDocument injects css for semantic ui
 */
export default class MyDocument extends Document {
  /**
   * inject styled-jsx
   * @param {object} props
   * @return {props}
   */
  static getInitialProps({renderPage}) {
    const {html, head, errorHtml, chunks} = renderPage();
    const styles = flush();
    return {html, head, errorHtml, chunks, styles};
  }

  /**
   * render
   * @return {ReactElement} server-side markup
   */
  render() {
    const stylesheet =
      '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css';

    return (
     <html>
       <Head>
         <link rel='stylesheet' href={stylesheet} />
       </Head>
       <body>
         <Main />
         <NextScript />
       </body>
     </html>
    );
  }
}
