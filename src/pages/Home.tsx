import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
  
    setTasks(oldSate => [...oldSate, data])
    //TODO - add new task
  }
  function handleEditTask(taskId: number, taskNewTitle: string){
    
  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(task => ({ ...task }))
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    setTasks(oldSate => oldSate.filter(
      tasks => tasks.id !== id
    ))
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})