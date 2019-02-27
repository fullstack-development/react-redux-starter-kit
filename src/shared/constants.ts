import { ICommunication } from 'shared/types/redux';
import { IPaginationState } from 'shared/types/common';

export const initialCommunicationField: ICommunication = { isRequesting: false, error: '' };
export const initialPaginationState: IPaginationState = { page: 1, totalPages: 1 };
