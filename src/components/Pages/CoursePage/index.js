import React, { Component } from 'react';
import { withFirebase } from '../../Firebase';
import Course from '../../Course';

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      courses: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.getCourses().then(res => {
      this.setState({courses: res});
    }).catch(err => {
      console.log({err});
    });
  }

  componentWillUnmount() {
    this.props.firebase.courses().off();
  }

  render() {
    const { courses } = this.state;
    const courseComponents = courses.map(c => {
      const { title, id, modules } = c;
      console.log({c});
      return (<Course key={id} title={title} modules={modules}/>)
    });
    return (
      <div>
        <h1>Explore Course Catalog</h1>
        {courseComponents}
      </div>
    );
  }
}

export default withFirebase(CoursePage);