import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule, LoadingComponent } from '@c8y/ngx-components';
import { AIMessage } from '@c8y/ngx-components/ai';
import {
  AiChatComponent,
  AiChatMessageActionComponent,
  AiChatMessageComponent,
  AiChatSuggestionComponent
} from '@c8y/ngx-components/ai/ai-chat';

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
    CoreModule,
    FormsModule,
    JsonPipe
  ]
})
export class ChatExampleComponent {
  private _showTimestamps = false;
  showInitialMessage = false;

  get showTimestamps(): boolean {
    return this._showTimestamps;
  }

  set showTimestamps(value: boolean) {
    this._showTimestamps = value;
    this.updateDisplayMessages();
  }

  config = {
    headline: 'Welcome!',
    welcomeText: 'Type a message below to get started.',
    title: 'What can I help you with?',
    placeholder: 'Type your message here...',
    sendButtonText: 'Send',
    cancelButtonText: 'Cancel',
    disclaimerText: 'AI-generated responses can contain errors. Verify the details before use.',
    userInterfaceIcons: { send: 'arrow-circle-up', cancel: 'stop-circle' }
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
        content: 'Thank you for your message!',
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
