interface ICategory {
  uid: number;
  name: string;
  id: number;
}

interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IData {
  options: ICategory[];
  selected: number | null;
};

interface IReduxState {
  communications: {
    categoriesFetching: ICommunication;
  };
  data: IData;
}

export {
  IData,
  IReduxState,
  ICommunication,
  ICategory,
};
