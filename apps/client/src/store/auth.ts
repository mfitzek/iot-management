import { reactive, readonly } from 'vue';

const state = reactive({
  username: 'Hello',
  email: 'world@exe.com',
});

function is_authenticated() {
  return Math.random() < 0.5;
}

async function logout() {
  return true;
}

export default {
  state: readonly(state),
  is_authenticated,
  logout,
};
