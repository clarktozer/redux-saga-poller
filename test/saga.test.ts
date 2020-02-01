import { expectSaga } from "redux-saga-test-plan";
import { pollingSaga } from "../src";

const successRequest = () => Promise.resolve([1, 2, 3, 4, 5]);
const errorRequest = () => Promise.reject("Errored!");

it("API Success Test", () => expectSaga(pollingSaga).run());
