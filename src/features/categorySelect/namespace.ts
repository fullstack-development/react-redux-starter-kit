interface ICategory {
  uid: number;
  name: string;
  id: number;
}

interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IReduxState {
  communications: {
    categoriesFetching: ICommunication;
  };
  data: {
    options: ICategory[];
    selected?: number;
  };
}

export {
  IReduxState,
  ICommunication,
  ICategory,
};
