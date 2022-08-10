import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {

  public textArea = new FormControl(this.store.textareaContent);
  private sub: Subscription = new Subscription();

  constructor(
    private openAi: OpenAiService, 
    protected store: AppStateService, 
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void { this.syncTextareaContent() }
  ngAfterViewChecked(): void { this.cd.detectChanges() }

  private syncTextareaContent(): void {
    this.sub.add(
      this.textArea.valueChanges.subscribe({
        next: (v: string | null) => {
          if (v) this.store.textareaContent = v;
        }
      })
    );
  }

  private appendNewLine(aiRes: string): string {
    return `\n ${aiRes}\n\n You: `;
  } 

  private getNewTextareaContent(aiRes: string): string {
    return this.store.textareaContent + this.appendNewLine(aiRes);
  } 

  public submitConvo(): void {
    const prompt: string = this.store.textareaContent;
    const stop: [string, string] = [` ${this.store.username}:`, ` ${this.store.aiName}:`]
    const body: OpenAIRequestBody = { prompt: prompt, stop: stop };

    this.openAi.submitConversation(body).subscribe({
      next: (res: OpenAIResponseBody) => {
        const aiResponse: string = res.choices[0].text.trim();
        const newTextareaContent: string = this.getNewTextareaContent(aiResponse);
        
        this.store.textareaContent = newTextareaContent;
      },
      error: (e) => console.log('Error: could not submit conversation -> ', e) 
    });
  }

  public refreshConvo(): void {
    this.store.textareaContent = INITIAL_TEXTAREA_CONTENT;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
