import type { InjectionKey, Ref } from 'vue';

export const IsMenuOpenInjectionKey: InjectionKey<Ref<boolean, boolean>> = Symbol('IsMenuOpen');
