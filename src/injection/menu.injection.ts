import type { InjectionKey, Ref } from 'vue';

export const MenuToggleInjectionKey: InjectionKey<() => void> = Symbol('MenuToggle');

export const MenuOpenInjectionKey: InjectionKey<Readonly<Ref<boolean, boolean>>> =
  Symbol('MenuOpen');
