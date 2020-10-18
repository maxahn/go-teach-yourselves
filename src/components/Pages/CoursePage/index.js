import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import Course from '../../Course';
import Question from '../../Question';
import Module from '../../Module';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courses: [],
      // temp for demo and current state of db
      questions: [],
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.firebase.questions().once('value').then(snapshot => {
      // console.dir(snapshot.val());
      this.setState({
        questions: snapshot.val(),
        isLoading: false,
      });
    });
    // this.props.firebase.getCourses().then(res => {
    //   this.setState({courses: res});
    // }).catch(err => {
    //   console.log({err});
    // });
  }

  componentWillUnmount() {
    this.props.firebase.questions().off();
  }

  render() {
    const { isLoading, courses, questions} = this.state;
    const demoModuleTitle = 'Beginner Java';
    // const courseComponents = courses.map(c => {
    //   const { title, id, modules } = c;
    //   console.log({c});
    //   return (<Course key={id} title={title} modules={modules}/>)
    // });
    // console.log({questions});
    return (isLoading) ? <p>Loading...</p> :
    (
      <div>
        <h1>Explore Course Catalog</h1>
        <Link to={ROUTES.MODULE_DEMO}>{demoModuleTitle}</Link>
      </div>
    );
  }
}

export default withFirebase(CoursePage);