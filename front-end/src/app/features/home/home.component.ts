import { Component, OnDestroy, OnInit } from '@angular/core';
import { OpenAiService } from 'src/app/core/services/open-ai.service';
import { OpenAIRequestBody } from '@common-models';
import { INITIAL_TEXTAREA_CONTENT } from 'src/app/models/app-constants';
import { OpenAIResponseBody } from 'src/app/models/app-models';
import { AppStateService } from 'src/app/core/services/app-state.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public textArea = new FormControl(this.store.textareaContent);

  private readonly appendNewLine = (aiRes: string): string => `\n ${aiRes}\n\n You: `;
  private readonly getNewTextareaContent = (aiRes: string): string => this.store.textareaContent + this.appendNewLine(aiRes);

  private sub: Subscription = new Subscription();

  constructor(private openAi: OpenAiService, public store: AppStateService) { }

  ngOnInit(): void {
    this.syncTextareaContent();
  }

  private syncTextareaContent(): void {
    this.sub.add(
      this.textArea.valueChanges.subscribe({
        next: (v: string | null) => {
          if (v) this.store.textareaContent = v;
        }
    }))
  }

  public submit(): void {
    const prompt: string = this.store.textareaContent;
    const stop: [string, string] = [` ${this.store.username}:`, ` ${this.store.aiName}:`]

    const body: OpenAIRequestBody = {
      prompt: prompt,
      stop: stop
    };

    this.openAi.submitConversation(body).subscribe({
      next: (res: OpenAIResponseBody) => {
        const aiResponse: string = res.choices[0].text.trim();
        const newTextareaContent: string = this.getNewTextareaContent(aiResponse);
        
        this.store.textareaContent = newTextareaContent;
      } 
    });
  }

  public reset(): void {
    this.store.textareaContent = INITIAL_TEXTAREA_CONTENT;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
