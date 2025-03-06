import { render } from "@testing-library/vue";
import ReembolsosView from "../../src/views/ReembolsosView.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { routes } from "../../src/router";

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

test("renders ReembolsosView component", async () => {
  const { getByText } = render(ReembolsosView, {
    global: {
      plugins: [router],
    },
  });

  expect(getByText("Criar Reembolso")).toBeInTheDocument();
});
