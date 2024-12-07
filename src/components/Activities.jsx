import { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import useStories from '../hooks/useStories';

function Activities() {
  const { activities, fetchActivities } = useStories();

  const [radioValue, setRadioValue] = useState('0');
  const radios = [
    { name: '總覽', value: '0' },
    { name: '近期投稿', value: '1' },
    { name: '線下活動', value: '2' },
    { name: '桃園市政府客家事務局', value: '3' },
  ];

  const filteredActivities =
    radioValue === '0'
      ? activities
      : activities.filter((activity) => activity.type === radioValue);

  useEffect(() => {
    fetchActivities();
  }, []);

  // console.log(activities);

  return (
    <div className="px-3">
      <ButtonGroup className="mt-5 mb-3">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>

      <Row>
        {filteredActivities.map((activity, index) => (
          <Col sm={12} lg={6} key={index} className="p-3">
            <Card style={{ background: 'lightblue' }}>
              <Card.Body>
                <Card.Subtitle className="mb-3 text-muted">
                  {activity.description}
                </Card.Subtitle>
                <Card.Title>{activity.title}</Card.Title>
                {activity.duration && (
                  <Card.Text>活動日期：114/07/19</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* card template */}
        {/* <Col sm={12} lg={6} className='p-3'>
                <Card style={{background: "lightblue"}}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Card>
            </Col> */}
      </Row>
    </div>
  );
}

export default Activities;
