declare namespace CategorySelect {
    interface Category {
        uid: number;
        name: string;
        id: number;
    }

    interface Communication {
        isRequesting: boolean;
        error: string;
    }

    interface InitialState {
        communications: {
            categoriesFetching: Communication
        };
        data: {
            options: Array<Category>
            selected?: number
        };
    }
}

export default CategorySelect;