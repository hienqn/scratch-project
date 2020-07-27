import React, {Fragment, useState, useEffect} from 'react';
import {Container, Col, Row, Form, Card, Button } from 'react-bootstrap'; 
import Spinner from './Spinner'

const Explore = () => {

  const [response, setResponse] = useState([{
    idea_id: '',
    name: '',
    description: '',
    why: '',
    when_start:'',
    when_end: '',
    who: '',
    creator_username: '',
    image: '',
  }]);
  
  useEffect(() => {
    fetch('api/explore', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((data) => data.json())
    .then((data) => setResponse(data));
  }, [])

  // get technologies
  const techStack = ['HTML', 'JavaScript', 'Python', 'NodeJS'];
  // Generate checkbox component for each technology 
  const generateTech = techStack.map( e => {
     return(<Form>
        <div key='checkbox' className="mb-5 mt-5 ml-5">
          <Form.Check type='checkbox'>
            <Form.Check.Input type='checkbox' isValid/>
           <Form.Check.Label className='ml-2' > <h2>{e}</h2> </Form.Check.Label>
          </Form.Check>
        </div>
      </Form>)
  })

  // get Ideas name, description, and images. 
  // const ideas = ['idea1', 'idea2', 'idea3', 'idea4', 'idea5', 'idea6', 'idea7'];
  let ideas = response;
  // const ideas = ['idea1', 'idea2', 'idea3', 'idea4', 'idea5', 'idea6', 'idea7'];
  // Generate an array of box components
  const generateBoxes = ideas.map( idea => {
    return (
      <Card style={{ width: '18rem' }} className='m-2'>
        <Card.Img variant="top" src={idea.image} />
        <Card.Body>
          <Card.Title>{idea.name}</Card.Title>
          <Card.Text>
            {idea.description}
              </Card.Text>
          <Button variant="primary"> Find out more </Button>
        </Card.Body>
      </Card>
    )
  })
  
  // Search box component
  const searchIdea = (
    <Form>
    <Form.Group controlId="formBasicEmail">
        <Form.Label> <h1>May your dream come true</h1> </Form.Label>
      <Form.Control size="lg" type="text" placeholder="Search your dream..." />
      {/* <Button variant="primary" type="submit" className='mt-2'></Button> */}
    </Form.Group>
    </Form>
  )

  const explorePage =
  (<Container fluid>
      <Row>
        <Col lg={3} className='mt-4'>
          <Row noGutters> <h2> Choose technology stack </h2></Row>
          <div className=''>
            {generateTech}
          </div>
        </Col>

        <Col lg={9} class="d-flex align-items-center" className='mt-4'>
          {searchIdea}
          <Row>
            {generateBoxes}
          </Row>
        </Col>
      </Row>
  </Container>);

  return (response.length === 1 ? <Spinner /> :  <Fragment> {explorePage} </Fragment>);
};

export default Explore;
