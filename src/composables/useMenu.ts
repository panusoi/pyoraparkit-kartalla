import { ref } from 'vue';
import { autoCloseMenu } from '../utils/menu';

const isMenuOpen = ref<boolean>(autoCloseMenu() === false);

function openMenu() {
  isMenuOpen.value = true;
}

function closeMenu() {
  isMenuOpen.value = false;
}

export default function useMenu() {
  return { isMenuOpen, openMenu, closeMenu };
}
