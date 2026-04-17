import { JsonPipe, NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule, LoadingComponent } from '@c8y/ngx-components';
import { AIMessage, AssistantMessageDisplayConfig, ChatConfig } from '@c8y/ngx-components/ai';
import {
  AiChatAssistantMessageComponent,
  AiChatComponent,
  AiChatMessageActionComponent,
  AiChatMessageComponent,
  AiChatSuggestionComponent
} from '@c8y/ngx-components/ai/ai-chat';
import { gettext } from '@c8y/ngx-components/gettext';

@Component({
  selector: 'c8y-ai-chat-example',
  templateUrl: './ai-chat-example.component.html',
  standalone: true,
  imports: [
    AiChatComponent,
    AiChatMessageComponent,
    AiChatMessageActionComponent,
    AiChatSuggestionComponent,
    LoadingComponent,
    NgComponentOutlet,
    CoreModule,
    FormsModule,
    JsonPipe
  ]
})
export class ChatExampleComponent {
  AiChatAssistantMessageComponent = AiChatAssistantMessageComponent;

  private _showTimestamps = false;
  showInitialMessage = false;

  get showTimestamps(): boolean {
    return this._showTimestamps;
  }

  set showTimestamps(value: boolean) {
    this._showTimestamps = value;
    this.updateDisplayMessages();
  }

  config: ChatConfig = {
    headline: 'Welcome!',
    welcomeText: 'Type a message below to get started.',
    welcomePosition: 'top',
    title: 'What can I help you with?',
    placeholder: 'Type your message here...',
    sendButtonText: 'Send',
    cancelButtonText: 'Cancel',
    disclaimerText: 'AI-generated responses can contain errors. Verify the details before use.',
    suggestionsLayout: 'horizontal',
    appearance: 'framed',
    userInterfaceIcons: { send: 'arrow-circle-up', cancel: 'stop-circle' }
  };
  assistantMessageDisplayConfig: AssistantMessageDisplayConfig = {
    toolCallConfig: {
      'c8y-read-documentation': {
        executingLabel: gettext('Reading Cumulocity documentation'),
        completedLabel: gettext('Read Cumulocity documentation')
      }
    }
  };

  messages: AIMessage[] = [];
  displayMessages: AIMessage[] = [];
  showComponent = true;

  isLoading = false;

  async sendMessage(message: AIMessage): Promise<void> {
    this.isLoading = true;
    this.messages.push(message);
    this.updateDisplayMessages();
    setTimeout(() => {
      // Simulate a delay for the response
      this.messages.push({
        content: "I've finished implementing your **amazing idea**.",
        steps: [
          {
            type: 'text',
            text: '**Great idea**, I can definitely help you with that!\n\nFirst let me use some tools to gather the information I need.',
            reasoning:
              "The user asked me a question but I need more information. I see, I have some tools available that can help! \n\nNow I'll initiate a call to help solve this problem.",
            toolResults: [
              {
                toolName: 'c8y-read-documentation',
                toolCallId: 'call1',
                type: 'tool-result',
                input: { query: 'Example query' },
                output: '<html>\n<h1>\n    C8Y doc sample\n</h1>\n</html>'
              },
              {
                toolName: 'c8y-tool-with-json-output',
                toolCallId: 'call3',
                type: 'tool-result',
                input: {},
                output: { 'Key 1': 123, 'Key 2': 'Value 2' }
              },
              {
                toolName: 'c8y-tool-with-error',
                toolCallId: 'call4',
                type: 'tool-result',
                input: { url: 'something invalid' },
                output: 'This is an error message\nSomething bad happened',
                error: true
              }
            ]
          },
          {
            type: 'text',
            text: 'Your **excellent idea** has now been implemented!\n\nWhat would you like me to help with next?'
          }
        ],
        role: 'assistant',
        timestamp: new Date().toISOString()
      });
      this.updateDisplayMessages();
      this.isLoading = false;
    }, 1000);
  }

  revertMessage(message: AIMessage) {
    this.messages = this.messages.filter(m => m !== message);
    this.updateDisplayMessages();
  }

  reloadComponent() {
    // Reload the component by toggling the flag
    this.showComponent = false;
    setTimeout(() => {
      this.showComponent = true;
    });
  }

  private updateDisplayMessages() {
    this.displayMessages = this._showTimestamps
      ? this.messages
      : this.messages.map(({ timestamp: _timestamp, ...msg }) => msg);
  }
}
