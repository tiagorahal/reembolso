import { render } from "@testing-library/vue";
import LoginView from "../../src/views/LoginView.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../../src/router";

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

test("renders LoginView component", async () => {
  const { getByText } = render(LoginView, {
    global: {
      plugins: [router],
    },
  });

  expect(getByText("Entrar")).toBeInTheDocument();
});
