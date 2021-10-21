import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(t => t.title === newTaskTitle)){
      return Alert.alert("Você não pode cadastrar uma task com o mesmo nome!")
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(oldState => [...oldState, data]);
  
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task}))
    const foundTask = updatedTasks.find(item => (item.id === id))
    
    if(!foundTask)
      return;
    
    foundTask.done = !foundTask.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item", 
      "Tem certeza que você deseja remover esse item?",
      
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style:"cancel",
        },
        {
          text: "Sim",
          onPress: () => {setTasks(oldState => oldState.filter(
              task => task.id !== id
            ))},
        }
      ]
    );
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task}))
    const foundTask = updatedTasks.find(item => (item.id === taskId))

    if (!foundTask)
      return;

    foundTask.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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