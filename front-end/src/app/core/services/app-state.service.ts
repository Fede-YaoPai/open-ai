import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { INITIAL_APP_STATE } from 'src/app/models/app-constants';
import { AppState } from 'src/app/models/app-models';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private state: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(INITIAL_APP_STATE);
  public state$: Observable<AppState> = this.state.asObservable();

  // public readonly getUsername = (): string => this.state.getValue().username;
  // public readonly getTextareaContent = (): string => this.state.getValue().textareaContent;
  // public readonly getAiName = (): string => this.state.getValue().aiName;

  constructor() { }

  get username(): string {
    return this.state.getValue().username;
  }

  set username(u: string) {
    this.state.next({
      ...this.state.getValue(),
      username: u
    });
  }

  get textareaContent(): string {
    return this.state.getValue().textareaContent;
  }

  set textareaContent(t: string) {
    this.state.next({
      ...this.state.getValue(),
      textareaContent: t
    });
  }

  get aiName(): string {
    return this.state.getValue().aiName;
  }

  set aiName(a: string) {
    this.state.next({
      ...this.state.getValue(),
      aiName: a
    });
  }
}
