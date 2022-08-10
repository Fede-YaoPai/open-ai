import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LOCAL_BASE_URL, LOCAL_SERVER_PORT } from '@common-constants';
import { OpenAIRequestBody } from '@common-models';
import { OpenAIResponseBody } from 'src/app/models/app-models';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor(private http: HttpClient) { }

  public submitConversation(body: OpenAIRequestBody): Observable<OpenAIResponseBody> {
    return this.http.post<OpenAIResponseBody>(`${LOCAL_BASE_URL}:${LOCAL_SERVER_PORT}/submitConversation`, body);
  }

}
