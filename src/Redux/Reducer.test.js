import { configureStore } from "@reduxjs/toolkit";
import assestReducer, {
  addAssest,
  emptyAsssestState,
  updateAssestReducer,
  deleteAssest,
} from "../Redux/Reducer";


//-------------------------------------//
//----------------reducers----------------//
//-------------------------------------//


describe("Assest Reducer", () => {
  let store;
  beforeEach(() => {
    store = configureStore({ reducer: { assest: assestReducer } });
  });

  test("should add an assest to the state", () => {
    const newAssest = { id: 1, name: "Test assest" };
    store.dispatch(addAssest(newAssest));
    expect(store.getState().assest).toContainEqual(newAssest);
  });

  test("should update an existing assest in the state", () => {
    const initialState = [{ id: 1, name: "Test assest 1" }, { id: 2, name: "Test assest 2" }];
    store.dispatch(emptyAsssestState());
    store.dispatch(addAssest(initialState[0]));
    const updatedAssest = { id: 1, name: "Test assest 1 updated" };
    store.dispatch(updateAssestReducer(updatedAssest));
    expect(store.getState().assest).toContainEqual(updatedAssest);
  });

  test("should delete an assest from the state", () => {
    const initialState = [{ id: 1, name: "Test assest 1" }, { id: 2, name: "Test assest 2" }];
    store.dispatch(emptyAsssestState());
    store.dispatch(addAssest(initialState[0]));
    store.dispatch(addAssest(initialState[1]));
    store.dispatch(deleteAssest(1));
    expect(store.getState().assest).not.toContainEqual({ id: 1, name: "Test assest 1" });
  });
});