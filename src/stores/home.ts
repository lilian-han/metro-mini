import { defineStore } from 'pinia';

interface IState {}
export const useHomeStore = defineStore('home', {
  state: (): IState => ({}),
  getters: {},
  actions: {},
});
