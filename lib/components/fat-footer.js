import {Container, Grid, Image, Segment} from 'semantic-ui-react';

const FatFooter = () => (
  <Segment
    style={{margin: '5em 0em 0em', padding: '5em 0em'}}
    vertical
  >
    <Container textAlign='center'>
      <Grid columns={4} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <a href='http://topicquests.org'>
              <Image src='/static/images/TopicQuestsLogo_sm.png' centered />
            </a>
          </Grid.Column>
          <Grid.Column>
            <a href='https://opensource.org/licenses/Apache-2.0'>
              <Image src='/static/images/osi_greyscale_logo.png'
                size='tiny'
                centered
              />
            </a>
          </Grid.Column>
          <Grid.Column>
            <h1>Version 0.0.0</h1>
          </Grid.Column>
          <Grid.Column>
            <a href='https://github.com/topicquests/tq-portal-rt'>
              <Image src='/static/images/github.jpg' centered />
            </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);
export default FatFooter;
