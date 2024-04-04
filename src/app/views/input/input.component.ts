import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  formData = { question: null, note: null, type: 'true' };
  questions: string[] = [];
  questionsAll: string[] = [];

  addQuestion() {
    if (this.formData.question) {
      const questionContainer = document.getElementById('question-container');
      if (questionContainer) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('question-container');
        newDiv.style.paddingLeft = '0.25rem';
        newDiv.style.fontSize = '0.875rem';
        newDiv.style.fontWeight = '500';
        newDiv.style.color = '#374151';
        newDiv.style.backgroundColor = '#fff';
        newDiv.style.border = '1px solid #7c3aed';
        newDiv.style.borderRadius = '0.375rem';

        const questionText = document.createElement('span');
        questionText.textContent = this.formData.question;
        newDiv.appendChild(questionText);

        const deleteButton = document.createElement('a');
        deleteButton.href = '#';
        deleteButton.textContent = 'x';
        deleteButton.classList.add('p-2');
        deleteButton.addEventListener('click', (event) => {
          event.preventDefault();
          newDiv.remove();
          this.questions = this.questions.filter(q => q !== this.formData.question);
          this.questionsAll = this.questionsAll.filter(q => q !== this.formData.question);
        });
        newDiv.appendChild(deleteButton);

        questionContainer.appendChild(newDiv);

        this.questions.push(this.formData.question);
        this.questionsAll.push(this.formData.question);
        this.formData.question = null;

        console.log('Questions',this.questionsAll);

      }
    }
  }

  deleteQuestion() {
    const questionContainer = document.getElementById('question-container');
    if (questionContainer && this.questionsAll.length > 0) {
      const lastQuestion = this.questionsAll.pop();
      const lastQuestionDiv = questionContainer.lastChild;
      if (lastQuestionDiv) {
        lastQuestionDiv.remove();
      }
    }
  }

}

