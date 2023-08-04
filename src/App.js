import {Component} from 'react'
import {v4} from 'uuid'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    userInput: '',
    tasksList: [],
    activeTagId: tagsList[0].optionId,
    filters: [],
    isActive: false,
  }

  getUserInput = event => this.setState({userInput: event.target.value})

  selectTag = event => this.setState({activeTagId: event.target.value})

  addTask = event => {
    event.preventDefault()
    const {userInput, activeTagId} = this.state
    const taskTag = tagsList.filter(each => each.optionId === activeTagId)

    const newTask = {
      id: v4(),
      task: userInput,
      tag: taskTag[0].displayText,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      userInput: '',
      activeTagId: tagsList[0].optionId,
    }))
  }

  applyFilter = tag => {
    const {tasksList} = this.state
    const filteredTasks = tasksList.filter(each => each.tag === tag)
    this.setState({tasksList: filteredTasks})
  }

  render() {
    const {userInput, activeTagId, tasksList} = this.state
    return (
      <div className="app-container">
        <div>
          <h1>Create a task</h1>
          <form className="form">
            <label htmlFor="task">Task</label>
            <input
              type="text"
              placeholder="Enter the task here"
              id="task"
              value={userInput}
              onChange={this.getUserInput}
            />
            <label htmlFor="tags">Tags</label>
            <select id="tags" value={activeTagId} onChange={this.selectTag}>
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" onClick={this.addTask}>
              Add Task
            </button>
          </form>
        </div>
        <div>
          <h1>Tags</h1>
          <ul>
            {tagsList.map(each => (
              <li key={each.optionId}>
                <button
                  type="button"
                  onClick={() => this.applyFilter(each.displayText)}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1>Tasks</h1>
          {tasksList.length === 0 ? (
            <p>No Tasks Added Yet</p>
          ) : (
            <ul>
              {tasksList.map(each => (
                <li key={each.id}>
                  <p>{each.task}</p>
                  <p>{each.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
