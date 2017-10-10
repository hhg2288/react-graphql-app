// @flow

import axios from 'axios';

import { ApiUrl } from './constants';

// Loads students
//
// Dispatches ADD_STUDENT for each student returned to normalize the data
export function loadStudents() {
  return (dispatch: Function) => {
    axios(`${ApiUrl}/students`).then(result => {
      result.data.forEach(student => {
        dispatch({ type: 'ADD_STUDENT', payload: student });
      });
    });
  };
}

// Delete a student by `studentId`
//
// Dispatches REMOVE_STUDENT to remove the student from the store
export function deleteStudent(studentId: number) {
  return (dispatch: Function) => {
    axios.delete(`${ApiUrl}/students/${studentId}`).then(result => {
      dispatch({
        type: 'REMOVE_STUDENT',
        payload: {
          id: studentId
        }
      });
    });
  };
}

// Create a student
//
// Dispatches `loadStudents` to reload the student list
export function createStudent(student: object) {
  return (dispatch: Function) => {
    axios.post(`${ApiUrl}/students`, student).then(result => {
      dispatch(loadStudents());
    });
  };
}

// Update a student
//
// Dispatches `deselectStudent` immediately to clear the selection.
//
// On complete, dispatches `loadStudents` to reload the student list.
export function updateStudent(student: object) {
  return (dispatch: Function) => {
    dispatch(deselectStudent());

    axios.put(`${ApiUrl}/students/${student.id}`, student).then(result => {
      dispatch(loadStudents());
    });
  };
}

// Selects a student by `id`
//
// Dispatches `SET_SELECTED_STUDENT` with `id` as the payload
export function selectStudent(id: number) {
  return { type: 'SET_SELECTED_STUDENT', payload: id };
}

// Deselects the student
//
// Dispatches `REMOVE_SELECTED_STUDENT` with `id` as the payload
export function deselectStudent() {
  return { type: 'REMOVE_SELECTED_STUDENT' };
}
