import React from "react";
import { render, cleanup } from "@testing-library/react";

import Appointments from "components/Appointments";

afterEach(cleanup);


describe("Appointment", () => {

  it("renders without crashing", () => {
    // const fn = jest.fn();

    // render(<Appointments/>);

    // expect(fn).toHaveBeenCalledTimes(0)

    // fn(10);

    // expect(fn).toHaveBeenCalledTimes(1)
    // expect(fn).toHaveBeenCalledWith(10)

    const fn = jest.fn((a,b) => 42)

    fn(1,2)

    expect(fn).toHaveReturnedWith(42)

  });
})

//it and test are interchangeable
//Remember to group related teests in a describe block
//To skip a test: xit OR test.skip depending on the test declaration word
//To run tests in a specific file, presss 'p' in the watch mode on terminal and type the test file name