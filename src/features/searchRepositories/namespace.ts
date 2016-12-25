declare namespace SearchRepositories {
  interface ReduxState {
  }

  type StateSelector = (state: { [key: string]: any }) => ReduxState;
}

export default SearchRepositories;
