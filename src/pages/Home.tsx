import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }


    const TaskTitle = tasks.find(item => item.title === newTaskTitle)
    if (!TaskTitle) {
      setTasks(oldSate => [...oldSate, newTask]);

    } else {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome')
    }

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item => item.id === id)
    if (!foundItem)
      return;
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(tasks => tasks.id !== id);

    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {text: 'Sim', onPress: () => setTasks(updatedTasks)},
        {text: 'Não', style: 'cancel'},
      ]
    ) 
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updateEditTask = tasks.map(task => ({...task}))

    const foundItem = updateEditTask.find(item => item.id === taskId)
    if(!foundItem)
      return;
    foundItem.title = taskNewTitle;
    setTasks(updateEditTask);

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