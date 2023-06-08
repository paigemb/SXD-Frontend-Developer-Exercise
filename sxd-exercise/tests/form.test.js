// myForm.test.js
//TODO finish tests

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MyForm } from "./myForm.js";

test("rendering and submitting a basic Formik form", async () => {
  const handleSubmit = jest.fn();
  render(<MyForm onSubmit={handleSubmit} />);
  const user = userEvent.setup();

  await user.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({}));
});
