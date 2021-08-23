import { Answers } from "./answers.js";

class Quiz {
    $container;
    $btnQuiz;
    $panel;
    $optionA;
    $optionB;
    $optionC;
    $optionD;
    $question;

    constructor() {
        this.$container = document.createElement('div');
        this.$container.classList.add('faq-wrap');

        this.$btnQuiz = document.createElement('button');
        this.$btnQuiz.classList.add('accordion');
        this.$btnQuiz.dataset.bsToggle = 'modal';
        this.$btnQuiz.dataset.bsTarget = '#staticBackdrop';

        this.$panel = document.createElement('div');
        this.$panel.classList.add('col-xl-4', 'panel');
        this.$panel.setAttribute("role", "group");
        this.$panel.setAttribute("aria-label", "Basic radio toggle button group"); 

        // Tao A B C D cho quiz 
        this.$optionA = new Answers();
        this.$optionA.render().lastElementChild.innerHTML = 'A';

        this.$optionB = new Answers();
        this.$optionB.render().lastElementChild.innerHTML = 'B';

        this.$optionC = new Answers();
        this.$optionC.render().lastElementChild.innerHTML = 'C';

        this.$optionD = new Answers();
        this.$optionD.render().lastElementChild.innerHTML = 'D';


        this.$question = document.createElement('p');
        this.$question.hidden = 'true';
    }

    render() {
        this.$container.appendChild(this.$btnQuiz);

        this.$panel.appendChild(this.$optionA.render());
        this.$panel.appendChild(this.$optionB.render());
        this.$panel.appendChild(this.$optionC.render());
        this.$panel.appendChild(this.$optionD.render());

        this.$container.appendChild(this.$panel);
        this.$container.appendChild(this.$question);

        return this.$container;
    }

}

export {Quiz};