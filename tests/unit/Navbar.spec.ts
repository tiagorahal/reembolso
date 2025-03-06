import { render } from "@testing-library/vue";
import Navbar from "../../src/components/Navbar.vue";
import router from "../../src/router";
import Cookies from "js-cookie";

test("shows correct links when logged out", async () => {
  Cookies.remove("access-token"); 
  const { getByText, queryByText } = render(Navbar, { global: { plugins: [router] } });

  expect(getByText("Home")).toBeInTheDocument();
  expect(getByText("Login")).toBeInTheDocument();
  expect(getByText("Cadastro")).toBeInTheDocument();
  expect(queryByText("Reembolsos")).not.toBeInTheDocument();
});

test("shows correct links when logged in", async () => {
  Cookies.set("access-token", "fake-token"); 
  const { getByText, queryByText } = render(Navbar, { global: { plugins: [router] } });

  expect(getByText("Home")).toBeInTheDocument();
  expect(queryByText("Login")).not.toBeInTheDocument();
  expect(queryByText("Cadastro")).not.toBeInTheDocument();
  expect(getByText("Reembolsos")).toBeInTheDocument();
});
