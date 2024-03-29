import React from "react";
import "./App.css";

import TodoHeader from "../TodoHeader";
import TodoMenu from "../TodoMenu";
import TodoContent from "../TodoContent";
import TodoSide from "../TodoSide";
import TodoForm from "../TodoForm";

import { getTodoId, shortDate } from "../../helpers";

import fireApp from "../../fire";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      todos: [],
      activeSortInput: "all",
      req: "",
      edit: false,
      currentEditedTodoByIdx: null,
      isAuth: false,
      errorMessage: "",
      isLoading: false,
    };
    this.addTodo = this.addTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.updateTextarea = this.updateTextarea.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.toggleImportant = this.toggleImportant.bind(this);
    this.switchName = this.switchName.bind(this);
    this.switchSort = this.switchSort.bind(this);
    this.filterRequest = this.filterRequest.bind(this);
    this.filteredTodos = this.filteredTodos.bind(this);
    this.closeTodoSide = this.closeTodoSide.bind(this);
  }

  componentDidMount() {
    fireApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isAuth: true, email: user.email, isLoading: true });
        const userUid = fireApp.auth().currentUser.uid;
        const dbRef = fireApp.database().ref(`users/${userUid}/todos`);
        dbRef.once("value").then((snapshot) => {
          if (snapshot.exists()) {
            let todos = [];
            snapshot.forEach((i) => {
              let item = i.val();
              todos.push(item);
            });
            this.setState({ todos, isLoading: false });
          } else {
            this.setState({ isLoading: false });
          }
        });
      }
    });
  }
  pushTodosToFirebase() {
    let userUid = fireApp.auth().currentUser.uid;
    let db = fireApp.database();
    db.ref(`users/${userUid}`).set({
      todos: this.state.todos,
    });
  }
  getFullDate() {
    return new Date().toLocaleString("ru", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }
  //toggleImportant
  toggleImportant(id) {
    //1.Копия state
    const todos = [...this.state.todos];
    //2.Нашли index по id
    const idx = todos.findIndex((todo) => todo.id === id);
    //3.Поменяли important на !important
    todos[idx].important = !todos[idx].important;
    //4.Меняем todos в state
    this.setState(todos);
    this.pushTodosToFirebase();
  }
  //doneTodo
  doneTodo(id) {
    //1.Копия state
    let todos = [...this.state.todos];
    //2.Нашли index по id
    const idx = todos.findIndex((todo) => todo.id === id);
    const completedTodo = todos[idx];
    //3.Поменяли completed = true;
    completedTodo.completed = true;
    completedTodo.important = false;
    completedTodo.completedDate = this.getFullDate();
    todos = [...todos.slice(0, idx), ...todos.slice(idx + 1), completedTodo];
    //4.Меняем todos в state
    this.setState({ todos });
    //push todos to firebase
    this.pushTodosToFirebase();
    this.state.edit && this.setState({ edit: false });
  }
  addTodo() {
    this.setState(
      {
        todos: [
          {
            id: getTodoId(),
            title: "",
            text: "",
            important: false,
            completed: false,
            completedDate: "",
            dateOfCreate: shortDate,
          },
          ...this.state.todos,
        ],
      },
      () => {
        // используем колбэк для того, чтобы прочитать обновленный стейт и гарантировать(!) чтение this.state.todos[0].id из обновленного состояния.
        const id = this.state.todos[0].id;
        this.toggleEdit(id, "addTodo");
        //push todos to firebase
        this.pushTodosToFirebase();
      }
    );
  }
  // deleteTodo
  deleteTodo(id) {
    console.log(id);
    this.setState(
      { todos: this.state.todos.filter((todo) => todo.id !== id) },
      () => {
        //push todos to firebase
        this.pushTodosToFirebase();
      }
    );

    this.state.edit && this.setState({ edit: false });
  }
  //toggleEdit
  toggleEdit(id, f = null) {
    // f - проверка на то, была ли вызвана функция через кнопку "+" или же через TodoItem
    const todos = [...this.state.todos];
    const idx = todos.findIndex((todo) => todo.id === id);
    if (!this.state.edit || f) {
      this.setState({
        edit: true,
        currentEditedTodoByIdx: idx,
      });
    } else if (idx === this.state.currentEditedTodoByIdx) {
      this.setState({ edit: false });
    } else if (this.state.edit && idx !== this.state.currentEditedTodoByIdx) {
      this.setState({ currentEditedTodoByIdx: idx });
    }
  }
  //updateTitle
  updateTitle(value) {
    const todos = [...this.state.todos];
    todos[this.state.currentEditedTodoByIdx].title = value;
    this.setState({ todos });
    this.pushTodosToFirebase();
  }
  //updateTags
  updateTags(tag) {
    const { currentEditedTodoByIdx } = this.state;
    const todo = { ...this.state.todos[currentEditedTodoByIdx] };
    if (todo.tags) {
      todo.tags.push(tag);
    } else {
      todo.tags = [];
      todo.tags.push(tag);
    }
    this.setState({
      todos: [
        ...this.state.todos.slice(0, currentEditedTodoByIdx),
        todo,
        ...this.state.todos.slice(currentEditedTodoByIdx + 1),
      ],
    });
    this.pushTodosToFirebase();
  }
  //deleteTag
  deleteTag(idx) {
    const { currentEditedTodoByIdx } = this.state;
    const todo = { ...this.state.todos[currentEditedTodoByIdx] };
    const tags = todo.tags.filter((tag, index) => index !== idx);
    this.setState(
      {
        todos: [
          ...this.state.todos.slice(0, currentEditedTodoByIdx),
          { ...todo, tags },
          ...this.state.todos.slice(currentEditedTodoByIdx + 1),
        ],
      },
      () => this.pushTodosToFirebase()
    );
  }
  //updateTextarea
  updateTextarea(text) {
    const { currentEditedTodoByIdx } = this.state;
    const todo = { ...this.state.todos[currentEditedTodoByIdx] };
    this.setState(
      {
        todos: [
          ...this.state.todos.slice(0, currentEditedTodoByIdx),
          { ...todo, text },
          ...this.state.todos.slice(currentEditedTodoByIdx + 1),
        ],
      },
      () => this.pushTodosToFirebase()
    );
  }
  //closeTodoSide
  closeTodoSide() {
    this.setState({ edit: false });
  }
  //switchName
  switchName(name) {
    this.setState({ activeSortInput: name });
  }
  // switchSort
  switchSort(name) {
    switch (name) {
      case "all":
        return this.state.todos;
      case "active":
        return [...this.state.todos.filter((todo) => !todo.completed)];

      case "done":
        return [...this.state.todos.filter((todo) => todo.completed)];

      default:
        return this.state.todos;
    }
  }
  //filterRequest
  filterRequest(e) {
    const req = e.target.value;
    this.setState({ req });
  }
  //filteredTodos
  filteredTodos(todos, req) {
    if (req === "") {
      return todos;
    } else
      return todos.filter((todo) =>
        todo.title.toLowerCase().includes(req.toLowerCase())
      );
  }
  //firebase
  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };
  handleReg = (e) => {
    const { email, password } = this.state;
    e.preventDefault();
    fireApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.updateProfile({
          displayName: this.state.username,
        });
      });
  };
  handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ todos: [] });
    fireApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        if (user) {
          this.setState({ isAuth: true });
        } else {
          console.log("ошибка");
        }
      })
      .catch((error) => {
        console.log(error);
        switch (error.code) {
          case "auth/invalid-email":
            this.setState({ errorMessage: "Не правильный логин(почта)" });
            break;
          case "auth/user-not-found":
            this.setState({ errorMessage: "Пользователь не найден" });
            break;
          case "auth/wrong-password":
            this.setState({ errorMessage: "Не верный пароль" });
            break;
          default:
            return console.log(error.code);
        }
      });
  };
  handleLogout = () => {
    fireApp.auth().signOut();
    this.setState({
      username: "",
      email: "",
      password: "",
      isAuth: false,
      // todos: [],
    });
  };
  render() {
    const {
      currentEditedTodoByIdx,
      isAuth,
      errorMessage,
      username,
      email,
      password,
      isLoading,
    } = this.state;

    const todoSide = this.state.edit && (
      <TodoSide
        key={this.state.todos[currentEditedTodoByIdx].id}
        todo={this.state.todos[currentEditedTodoByIdx]}
        currentEditedTodoByIdx={currentEditedTodoByIdx}
        updateTitle={this.updateTitle}
        updateTags={this.updateTags}
        deleteTag={this.deleteTag}
        updateTextarea={this.updateTextarea}
        closeTodoSide={this.closeTodoSide}
        deleteTodo={this.deleteTodo}
      />
    );
    return (
      <div className="app">
        <TodoHeader
          isAuth={isAuth}
          handleLogout={this.handleLogout}
          email={email}
        />
        <main className="main">
          <TodoMenu />
          {isAuth ? (
            <TodoContent
              state={this.state}
              isLoading={isLoading}
              toggleImportant={this.toggleImportant}
              doneTodo={this.doneTodo}
              addTodo={this.addTodo}
              deleteTodo={this.deleteTodo}
              toggleEdit={this.toggleEdit}
              switchName={this.switchName}
              switchSort={this.switchSort}
              filterRequest={this.filterRequest}
              filteredTodos={this.filteredTodos}
            />
          ) : (
            <TodoForm
              username={username}
              email={email}
              password={password}
              handleUsername={this.handleUsername}
              handleEmail={this.handleEmail}
              handlePassword={this.handlePassword}
              handleReg={this.handleReg}
              handleSignIn={this.handleSignIn}
              errorMessage={errorMessage}
            />
          )}
        </main>
        {todoSide}
      </div>
    );
  }
}
export default App;
