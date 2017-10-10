// @flow

import axios from 'axios';

import { ApiUrl } from './constants';

export function loadCourses() {
  return (dispatch: Function) => {
    axios(`${ApiUrl}/courses`).then(result => {
      result.data.forEach(course => {
        dispatch({ type: 'ADD_COURSE', payload: course });
      });
    });
  };
}

// Delete a course by `courseId`
//
// Dispatches REMOVE_COURSE to remove the course from the store
export function deleteCourse(courseId: number) {
  return (dispatch: Function) => {
    axios.delete(`${ApiUrl}/courses/${courseId}`).then(result => {
      dispatch({
        type: 'REMOVE_COURSE',
        payload: {
          id: courseId
        }
      });
    });
  };
}

// Create a course
//
// Dispatches `loadCourses` to reload the course list
export function createCourse(course: object) {
  return (dispatch: Function) => {
    axios.post(`${ApiUrl}/courses`, course).then(result => {
      dispatch(loadCourses());
    });
  };
}

// Update a course
//
// Dispatches `deselectCourse` immediately to clear the selection.
//
// On complete, dispatches `loadCourses` to reload the course list.
export function updateCourse(course: object) {
  return (dispatch: Function) => {
    dispatch(deselectCourse());

    axios.put(`${ApiUrl}/courses/${course.id}`, course).then(result => {
      dispatch(loadCourses());
    });
  };
}

// Selects a course by `id`
//
// Dispatches `SET_SELECTED_COURSE` with `id` as the payload
export function selectCourse(id: number) {
  return { type: 'SET_SELECTED_COURSE', payload: id };
}

// Deselects the course
//
// Dispatches `REMOVE_SELECTED_COURSE` with `id` as the payload
export function deselectCourse() {
  return { type: 'REMOVE_SELECTED_COURSE' };
}
