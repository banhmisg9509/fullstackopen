import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);

    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("reset state to all zero", () => {
    const actions = [
      { type: "BAD" },
      { type: "BAD" },
      { type: "BAD" },
      { type: "GOOD" },
      { type: "GOOD" },
      { type: "OK" },
    ];

    let state = deepFreeze(initialState);
    actions.forEach((action) => {
      state = counterReducer(state, action);
    });

    expect(state).toEqual({
      good: actions.filter((action) => action.type === "GOOD").length,
      ok: actions.filter((action) => action.type === "OK").length,
      bad: actions.filter((action) => action.type === "BAD").length,
    });

    const resetAction = {
      type: "ZERO",
    };

    state = counterReducer(state, resetAction);

    expect(state).toEqual(initialState);
  });
});
