import { ref } from 'vue';

const isMenuOpen = ref<boolean>(false);

function openMenu() {
  isMenuOpen.value = true;
}

function closeMenu() {
  isMenuOpen.value = false;
}

export default function useMenu() {
  return { isMenuOpen, openMenu, closeMenu };
}
