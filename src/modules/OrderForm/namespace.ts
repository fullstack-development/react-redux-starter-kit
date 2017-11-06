interface ICommunication {
  isRequesting: boolean;
  error: string;
}

interface IReduxState {
  communications: {
    saving: ICommunication;
  };
  data: { message: string; } | null;
}

interface ISaveFields {
  type: 'HOME_MODULE:SAVE_FIELDS';
}

interface ISaveFieldsSuccess {
  type: 'HOME_MODULE:SAVE_FIELDS_SUCCESS';
  payload: string;
}

interface ISaveFieldsFail {
  type: 'HOME_MODULE:SAVE_FIELDS_FAIL';
  payload: string;
}

type Action = ISaveFields | ISaveFieldsSuccess | ISaveFieldsFail;

export {
  ICommunication,
  IReduxState,
  ISaveFields,
  ISaveFieldsSuccess,
  ISaveFieldsFail,
  Action,
};
